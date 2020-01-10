const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load User and Profile models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// Load profile validation
const profileValidate = require('../../validation/profile')

// @route   GET /api/profile/test
// @desc    Teset Profile routs
// @access  Public
router.get('/test', (req, res) => res.send('profile'))

// @route   GET /api/profile/
// @desc    Get user profile
// @access  Public
router.get('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {}

      Profile.findOne({user: req.user.id})
        .then(profile => {
          if(!profile){
            errors.noProfile = 'No profile exists'
            return res.status(400).json(errors) 
          }
          return res.json(profile)
        })
        .catch(err => res.status(400).json(err))
    }
);

// @route   POST /api/profile/
// @desc    Create or Edit profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const {errors, isValid} = profileValidate(req.body)
      if(!isValid){
        return res.status(400).json(errors)
      }

      const profileFields = {}
      profileFields.user = req.user.id

      if(req.body.handle) profileFields.handle = req.body.handle
      if(req.body.status) profileFields.status = req.body.status
      if(req.body.company) profileFields.company = req.body.company
      if(req.body.bio) profileFields.bio = req.body.bio
      // Split skills into array
      if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',')
      }
      if(req.body.githubAcc) profileFields.githubAcc = req.body.githubAcc
      // Social
      profileFields.social = {}
      if(req.body.youtube) profileFields.social.youtube = req.body.youtube
      if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
      if(req.body.facebook) profileFields.social.facebook = req.body.facebook
      if(req.body.twitter) profileFields.social.twitter = req.body.twitter

      Profile.findOne({user: req.user.id})
        .then(profile => {
          if(profile){
            // Update
            Profile.findOneAndUpdate(
              {user: req.user.id},
              {$set: profileFields},
              {new: true}
            ).then(profile => res.json(profile))
          }else{
            // Create

            // check if handle exits
            Profile.findOne({handle: profileFields.handle})
              .then(profile => {
                if(profile){
                  errors.handle = 'Handle exits'
                  return res.status(400).json(errors)
                }
                // save profile
                new Profile(profileFields).save().then(profile => res.json(profile))
              })
          }
        })
    }
);
module.exports = router