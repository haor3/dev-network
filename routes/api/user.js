const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')

// @route   GET /api/user/test
// @desc    Teset User routs
// @access  Public
router.get('/test', (req, res) => res.send('tests'))

// @route   GET /api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const {name, email, password} = req.body
  User.findOne({email})
    .then(user => {
      if(user){
        return res.status(400).json('Email is existed')
      }else{
        const newUser = new User({
          name: name,
          email: email,
          password: password
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
              // Store hash in your password DB.
              if(err){
                throw err
              }
              newUser.password = hash
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
          })
        });
      }
    })
    .catch(err => console.log(err))
})

// @route   GET /api/user/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  const {name, email, password} = req.body
  User.findOne({email})
    .then(user => {
      if(!user){
        return res.status(400).json('User cannot be found')
      }else{
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch){
              return res.json(user)
            }else{
              return res.status(400).json('Password is wrong')
            }
          });
      }
    })
})

module.exports = router