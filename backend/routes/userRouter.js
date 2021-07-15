//js esversion: 6

const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err.message));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  User.findOne({username:username}).then((user)=>{
        if(!user){
          const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
        }
        else {
          res.json("user found");
        }
  })
  .catch(err => res.json('Error: ' + err));
  
});

router.route('/delete').post((req, res) => {
  const user = req.body.username;

  User.findOneAndDelete({username:user})
    .then((user) => {if(!user){res.json('No user!')}else{res.json('User deleted!')}})
    .catch(err => res.json('Error: ' + err));
});

module.exports = router;