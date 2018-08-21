const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load User and Profile models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

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

      Profile.findOne({id: req.body.id})
        .then(profile => {
          if(!profile){
            errors.noProfile = 'No profile exists'
            return res.status(400).json(errors) 
          }
          return res.json(profile)
        })
        .catch(err => err.status(400).json(err))
    }
);

// @route   GET /api/profile/create
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {}

      Profile.findOne({id: req.body.id})
        .then(profile => {
          if(!profile){
            errors.noProfile = 'No profile exists'
            return res.status(400).json(errors) 
          }
          return res.json(profile)
        })
        .catch(err => err.status(400).json(err))
    }
);

// @route   GET /api/profile/
// @desc    Create or Edit profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {}
      const profileFields = {}
      profileFields.user = req.user.id

      if(req.body.handle) profileFields.handle = req.body.handle
      if(req.body.company) profileFields.company = req.body.company
      if(req.body.bio) profileFields.bio = req.body.bio
      // Split skills into array
      if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',s')
      }
      if(req.body.githubAcc) profileFields.githubAcc = req.body.githubAcc
      if(req.body.experiences) profileFields.experiences = req.body.experiences
      // Social
      profileFields.social = {}
      if(req.body.youtube) profileFields.social.youtube = req.body.youtube
      if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
      if(req.body.facebook) profileFields.social.facebook = req.body.facebook
      if(req.body.twitter) profileFields.social.twitter = req.body.twitter

      Profile.findOne({id: req.body.id})
        .then(profile => {
          if(profile){
            // Update
            Profile.findByIdAndUpdate(
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