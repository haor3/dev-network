import {
  LOADING_USER_DATABASE,
  USER_CREATED_SUCCESS,
  USER_CREATED_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS
} from './types'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
const axios = require('axios')

export const registerUser = userData => dispatch => {
  dispatch({type: LOADING_USER_DATABASE})
  axios.post('/api/user/register', userData)
      .then(user => dispatch({
                              type: USER_CREATED_SUCCESS, 
                              payload: user.data
                            }))
      .catch(err => dispatch({
                              type: USER_CREATED_FAIL, 
                              payload: err.response.data
                            }))
}

export const loginUser = userData => dispatch => {
  dispatch({
            type: LOADING_USER_DATABASE
          })
  axios.post('/api/user/login', userData)
    .then(res => {
      const {token} = res.data
      // save to localstorage
      localStorage.setItem('jwtToken', token)
      // set token to Auth header
      setAuthToken(token)
      // // decode token to get user data
      const decoded = jwt_decode(token)
      // set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
                            type: USER_LOGIN_FAIL, 
                            payload: err.response.data
                          }))
}

export const setCurrentUser = decoded => {
  return {
    type: USER_LOGIN_SUCCESS, 
    payload: decoded
  }
}