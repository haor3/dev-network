import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {logoutUser} from '../../actions/user.actions'
import {clearProfile} from '../../actions/profile.actions'

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.loginState.isAuthenticated,
    user: state.loginState.user
  }
}
class Navbar extends Component {
  onLogout = (e) => {
    this.props.clearProfile()
    this.props.logoutUser()
  }

  render(){
    const userLink = (
      <ul className="navbar-nav ml-auto">        
        <li className="nav-item">
          <Link className="nav-link" onClick={this.onLogout} to="/login">Log out</Link>
        </li>
      </ul>
    )
    const guest = (
      <ul className="navbar-nav ml-auto">        
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )

    const {isAuthenticated} = this.props
    return(
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">DevConnector</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles"> Profiles
                  </Link>
                </li>
              </ul>     
                
             
            </div>
            {isAuthenticated ? userLink : guest}
          </div>
        </nav>
      </div>
    )
  }
}

export default connect(mapStateToProps, {logoutUser, clearProfile})(Navbar)