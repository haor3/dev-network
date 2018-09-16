import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {getProfile} from '../../actions/profile.actions'
import {connect} from 'react-redux'
import Spinner from '../../common/input-form/Spinner'

const mapStateToProps = state => {
  return {
    user: state.loginState,
    profile: state.profileState
  }
}
class Dashboard extends Component {
  componentDidMount(){
    this.props.getProfile()
  }
  render(){
    const {user} = this.props.user
    const {profile, isLoading} = this.props.profile
    
    let content

    if(profile === null || isLoading){
      content = <Spinner />
    }else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        // content = <h4>TODO: DISPLAY PROFILE</h4>;
        content = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            {/* <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} /> */}
            <div style={{ marginBottom: '60px' }} />
            {/* <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button> */}
          </div>
        );
      } else {
        // User is logged in but has no profile
        content = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return(
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, {getProfile})(Dashboard)