import {
  USER_CREATED_FAIL,
  USER_LOGIN_FAIL, 
  PROFILE_CREATING_FAIL
} from '../actions/types'

const initialState = {
  errors: {}
}

export const errorState = (state=initialState, action={}) => {
  switch(action.type){
    case USER_CREATED_FAIL:
      return {
        ...state,
        errors: action.payload
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        errors: action.payload
      }
    case PROFILE_CREATING_FAIL:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state
  }
}
