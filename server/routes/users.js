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

module.exports = router;