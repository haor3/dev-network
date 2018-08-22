import React, { Component } from 'react'
import axios from 'axios'

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
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit = (e) => {
    // e.preventDefault()
    const {name, email, password, password1} = this.state
    const newUser = {
      name: name,
      email: email,
      password: password,
      password1: password1
    }
    axios.post('/api/user/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))
  }
  render(){
    return(
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Name" 
                    value={this.state.name}
                    name="name" 
                    onChange={this.onChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Email Address" 
                    value={this.state.email}
                    onChange={this.onChange}
                    name="email" 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Password" 
                    value={this.state.password}
                    onChange={this.onChange}
                    name="password" 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Confirm Password" 
                    value={this.state.password1}
                    onChange={this.onChange}
                    name="password1" 
                  />
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

export default Register