import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropType from 'prop-types'
import classnames from 'classnames'
import { registerUser } from '../../actions/user.actions'

const mapStateToProps = (state) => {
  return {
    user: state.registerState.user,
    errors: state.registerState.errors
  }
}


// const mapDispatchToProps = (dispatch) => {
//   return {
//     registerAuth: (newUser) => dispatch(registerAuth(this.props.user))
//   }
// }
class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email:'',
      password: '',
      password1: ''
    }
  }
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit = (e) => {
    e.preventDefault()
    const {name, email, password, password1} = this.state
    const userData = {
      name: name,
      email: email,
      password: password,
      password1: password1
    }
    this.props.registerUser(userData)
  }
  render(){
    const {errors} = this.props
    const {user} = this.props
    console.log(errors)
    return(
      <div className="register">
      { (user) ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name
                    })} 
                    placeholder="Name"
                    name="name"  
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}  
                    placeholder="Email Address"
                    name="email"  
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })} 
                    placeholder="Password"                     
                    name="password" 
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password1
                    })}  
                    placeholder="Confirm Password"
                    name="password1"  
                    value={this.state.password1}
                    onChange={this.onChange}
                  />
                  {errors.password1 && (<div className="invalid-feedback">{errors.password1}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  registerUser: PropType.func.isRequired,
  user: PropType.object.isRequired,
  errors: PropType.object.isRequired
}

export default connect(mapStateToProps, {registerUser})(Register)