
import axios from 'axios'
import {
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  PROFILE_FOUND,
  PROFILE_CLEAR
} from './types'

export const getProfile = () => dispatch => {
  dispatch({type: PROFILE_LOADING})
  axios.post('/api/profile')
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
