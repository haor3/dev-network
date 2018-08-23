import React, { Component } from 'react'
import classnames from 'classnames'
import PropType from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/user.actions'  

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.loginState.isAuthenticated,
    user: state.loginState.user,
    errors: state.loginState.errors,
  }
}



class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    const userData = {
      email: email,
      password: password
    }
    this.props.loginUser(userData)
  }
  render(){
    const {user, errors} = this.props
    return(
      <div className="login">
      {(user) ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropType.func.isRequired,
  user: PropType.object.isRequired,
  errors: PropType.object.isRequired
}

export default connect(mapStateToProps, {loginUser})(Login)