
import axios from 'axios'
import {
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  PROFILE_FOUND
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
