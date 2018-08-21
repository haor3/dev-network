const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = registerValidate = (data) => {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  
  // Email field must be required
  if(Validator.isEmpty(data.email)){
    errors.email = 'Email field must be required'
  }
  // Password field must be required
  if(Validator.isEmpty(data.password)){
    errors.password = 'Password field must be required'
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}