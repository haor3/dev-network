import {
  LOADING_USER_DATABASE,
  USER_CREATED_SUCCESS,
  USER_CREATED_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS
} from '../actions/types'

const userState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  errors: {}
}

export const registerState = (state=userState, action={}) => {
  switch(action.type){
    case LOADING_USER_DATABASE:
      return{...state, 
              isLoading: true
            }
    case USER_CREATED_SUCCESS:
      return{...state, 
              isLoading: false,
              user: action.payload
            }
    case USER_CREATED_FAIL:
      return{...state, 
              isLoading: false,
              errors: action.payload
            }
    default:
      return state
  }
}

export const loginState = (state=userState, action={}) => {
  switch(action.type){
    case LOADING_USER_DATABASE:
      return{...state, 
              isLoading: true
            }
    case USER_LOGIN_SUCCESS:
      return{...state, 
              isLoading: false,
              isAuthenticated: true,
              user: action.payload
            }
    case USER_LOGIN_FAIL:
      return{...state, 
              isLoading: false,
              errors: action.payload
            }
    default:
      return state
  }
}