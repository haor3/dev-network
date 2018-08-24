import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { registerUser } from '../../actions/user.actions'
import InputForm from '../../common/InputForm'

const mapStateToProps = (state) => {
  return {
    errors: state.errorState.errors
  }
}

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email:'',
      password: '',
      password1: '',
      errors: {}
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.errors !== this.props.errors){
      this.setState({errors: this.props.errors})
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
    this.props.registerUser(userData, this.props.history)
  }
  render(){
    const {errors} = this.state
    
    return(
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <InputForm
                  type="name" 
                  error={errors.name}
                  placeholder="Name" 
                  name="name" 
                  value={this.state.name}
                  onChange={this.onChange}
                /> 
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
                <InputForm
                  type="password" 
                  error={errors.password1}
                  placeholder="Confirm Password" 
                  name="password1" 
                  value={this.state.password1}
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


export default connect(mapStateToProps, {registerUser})(withRouter(Register)) 