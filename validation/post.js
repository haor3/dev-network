const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = postValidate = (data) => {
  let errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''
  
  // Text field must be required
  if(Validator.isEmpty(data.text)){
    errors.text = 'Text field must be required'
  }
  // Text field must be from 2 to 10 characters
  if(!Validator.isLength(data.text, {min: 10, max: 300})){
    errors.text = 'Text must be from 10 to 300 characters'
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}