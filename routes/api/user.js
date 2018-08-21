const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Get the secret key
const secretKey = require('../../config/keys').secretKey

// Load input validation
const registerValidate = require('../../validation/register')
const loginValidate = require('../../validation/login')

// @route   GET /api/user/test
// @desc    Teset User routs
// @access  Public
router.get('/test', (req, res) => res.send('tests'))

// @route   GET /api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const {name, email, password} = req.body
  const {errors, isValid} = registerValidate(req.body)

  if(!isValid){
    return res.json(errors)
  }
  User.findOne({email})
    .then(user => {
      if(user){
        errors.email = 'Email is existed'
        return res.status(400).json(errors)
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
  const {email, password} = req.body
  const {errors, isValid} = loginValidate(req.body)

  if(!isValid){
    return res.status(400).json(errors)
  }
  User.findOne({email})
    .then(user => {
      if(!user){
        errors.email = 'User cannot be found'
        return res.status(400).json(errors)
      }else{
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch){
              const payload = {
                id: user.id,
                name: user.name,
                password: user.password
              }
              jwt.sign(
                payload, 
                secretKey, 
                {expiresIn: 3600}, 
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer '+token
                  })
              });
              // return res.json(user)
            }else{
              errors.password = 'Password is wrong'
              return res.status(400).json(errors)
            }
          });
      }
    })
})

// @route   GET /api/user/current
// @desc    Current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.send(req.user);
    }
);
module.exports = router