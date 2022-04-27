const router = require('express').Router();
let User = require('../models/userMode');

//apis
//--> fetch users api
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//--> create user api
router.route('/add').post((req, res) => {
  console.log("Add user")
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  //fetch usernames for check
  User.find({}, { username: 1, _id: 0 })
    .then(usernames => {
      console.log("first", usernames)

      //check duplicate username
      usernames.map(ele => {
        if (ele.username === username) {
          console.log("Duplicate User!");
          return res.status(404).json(`Error: ${username} is already exist!`);
        }
      })
    })
    .catch(err => res.status(400).json('Error: ' + err))

  //check confirm password and add new user
  if (confirmPassword === password) {
    const newUser = new User({
      username,
      name,
      password
    });

    //save userDetails in mongo
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    res.status(400).json('Password Not matched!');
  }

});

//--> get User by id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//--> delete User by id
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//--> update User details by id
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(uData => {
      uData.username = req.body.username;
      uData.name = req.body.name;

      //update all detailes escape password
      uData.save()
        .then(() => res.json('User details updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//--> reset users password
router.route('/resetPassword/:id').post((req, res)=>{
  User.findById(req.params.id)
  .then(userPwd => {
    userPwd.password = req.body.password;
    const cPwd = req.body.confirmPassword;

    //confirm reset password and save
    if(userPwd.password === cPwd){
      userPwd.save()
      .then(() => res.json('Reset Password Successfully!'))
      .catch(err => res.status(400).json('Error: ' + err));
    }
  })
  .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;