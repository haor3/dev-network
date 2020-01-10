const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = profileValidate = (data) => {
  let errors = {}

  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''
  data.status = !isEmpty(data.status) ? data.status : ''

  // Handle field must be from 2 to 10 characters
  if(!Validator.isLength(data.handle, {min: 2, max: 40})){
    errors.handle = 'Handle must be from 2 to 10 characters'
  }
  // Handle field must be required
  if(Validator.isEmpty(data.handle)){
    errors.handle = 'Handle field must be required'
  }
  // Skills field must be required
  if(Validator.isEmpty(data.skills)){
    errors.skills = 'Skills field must be required'
  }
  // Status field must be required
  if(Validator.isEmpty(data.status)){
    errors.status = 'Status field must be required'
  }
  // Must be in URL format
  if(!Validator.isEmpty(data.status)){
    if(!Validator.isURL(data.githubAcc)){
      errors.githubAcc = 'Must be in URL format'
    }
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}