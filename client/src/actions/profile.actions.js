
import axios from 'axios'
import {
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  PROFILE_FOUND,
  PROFILE_CLEAR,
  PROFILE_CREATING,
  PROFILE_CREATING_SUCCESS,
  PROFILE_CREATING_FAIL
} from './types'

export const getProfile = () => dispatch => {
  dispatch({type: PROFILE_LOADING})
  axios.get('/api/profile')
    .then(res => 
      dispatch({
        type: PROFILE_FOUND,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: PROFILE_NOT_FOUND,
        payload: {}
      })
    )
}

export const clearProfile = () => dispatch => {
  dispatch({
    type: PROFILE_CLEAR,
    payload: null
  })
}

export const createProfile = (profile) => dispatch => {
  dispatch({type: PROFILE_CREATING})
  axios.post('/api/profile', profile)
    .then(profile => 
      dispatch({
        type: PROFILE_CREATING_SUCCESS,
        payload: profile.data
      })
    )
    .catch(err => dispatch({
        type: PROFILE_CREATING_FAIL,
        payload: err.response.data
      })
    )
}
