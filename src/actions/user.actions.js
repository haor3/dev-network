import {
  LOADING_USER_DATABASE,
  USER_CREATED_SUCCESS,
  USER_CREATED_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOG_OUT
} from './types'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
const axios = require('axios')

// user register 
export const registerUser = (userData, history) => dispatch => {
  dispatch({type: LOADING_USER_DATABASE})
  axios.post('/api/user/register', userData)
      .then(user => dispatch({
                              type: USER_CREATED_SUCCESS, 
                              payload: user.data
                            }))
      .then(() => history.push('/login'))
      .catch(err => dispatch({
                              type: USER_CREATED_FAIL, 
                              payload: err.response.data
                            }))
}
//user log in
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
// set current user
export const setCurrentUser = decoded => {
  return {
    type: USER_LOGIN_SUCCESS, 
    payload: decoded
  }
}
// user log out
export const logoutUser = () => dispatch => {
  // remove the token
  localStorage.removeItem('jwtToken')
  // remove auth header
  setAuthToken(false)
  // set current user to false
  dispatch({
    type: USER_LOG_OUT,
    payload: {}
  })
}