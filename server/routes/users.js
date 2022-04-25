const router = require('express').Router();
let User = require('../models/userMode');

//apis
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log("Add user")
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  //check confirm password
  if(confirmPassword === password){
    const newUser = new User({
      username,
      name,
      password
    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  }else{
    res.status(400).json('Password Not matched!');
  }
  
});

module.exports = router;