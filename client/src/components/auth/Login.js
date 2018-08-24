import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/user.actions'  
import InputForm from '../../common/InputForm'

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.loginState.isAuthenticated,
    // user: state.loginState.user,
    errors: state.errorState.errors,
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
  componentDidUpdate(prevProps){
    if(prevProps.isAuthenticated !== this.props.isAuthenticated){
      this.props.history.push('/')
    }
    if(prevProps.errors !== this.props.errors){
      this.setState({errors: this.props.errors})
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
    const {errors} = this.state
    const {user} = this.props
    return(
      <div className="login">
      {(user) ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>                
                <InputForm
                  type="email" 
                  error={errors.email}
                  placeholder="Email Address" 
                  name="email" 
                  value={this.state.email}
                  onChange={this.onChange}
                />                
                <InputForm
                  type="password" 
                  error={errors.password}
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, {loginUser})(Login)