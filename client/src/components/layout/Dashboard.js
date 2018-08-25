import React, { Component } from 'react'
import {getProfile} from '../../actions/profile.actions'
import {connect} from 'react-redux'

class Dashboard extends Component {
  componentDidMount(){
    this.props.getProfile()
  }
  render(){
    return(
      <div>
        
      </div>
    )
  }
}

export default connect(null, {getProfile})(Dashboard)