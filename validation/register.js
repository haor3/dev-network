const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = registerValidate = (data) => {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password1 = !isEmpty(data.password1) ? data.password1 : ''

  // Name field must be from 2 to 10 characters
  if(!Validator.isLength(data.name, {min: 2, max: 10})){
    errors.name = 'Name must be from 2 to 10 characters'
  }
  // Name field must be required
  if(Validator.isEmpty(data.name)){
    errors.name = 'Name field must be required'
  }
  // Email field must be required
  if(Validator.isEmpty(data.email)){
    errors.email = 'Email field must be required'
  }
  // Password field must be required
  if(Validator.isEmpty(data.password)){
    errors.password = 'Password field must be required'
  }
  // Confirm password field must be required
  if(Validator.isEmpty(data.password1)){
    errors.password1 = 'Confirm Password field must be required'
  }
  // Password must be matched
  if(!Validator.equals(data.password, data.password1)){
    errors.password1 = 'Password must be matched'
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}