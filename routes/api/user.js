const express = require('express')
const router = express.Router()
const User = require('../../models/User')

// @route   GET /api/user/test
// @desc    Teset User routs
// @access  Public
router.get('/test', (req, res) => res.send('tests'))

// @route   GET /api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  // const {name, email, password} = req.body
  User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        return res.status(400).json('Email is existed')
      }else{
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        newUser.save()
        return res.json(newUser)
      }
    })
    .catch(err => console.log(err))
})

module.exports = router