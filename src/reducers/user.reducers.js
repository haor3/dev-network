import {
  LOADING_USER_DATABASE,
  USER_CREATED_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOG_OUT
} from '../actions/types'

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {}
}

export const registerState = (state=initialState, action={}) => {
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
    default:
      return state
  }
}

export const loginState = (state=initialState, action={}) => {
  switch(action.type){
    case LOADING_USER_DATABASE:
      return{...state, 
              isLoading: true
            }
    case USER_LOGIN_SUCCESS:
      return{...state,
              isAuthenticated: true,
              user: action.payload
            }
    case USER_LOG_OUT:
      return{...state,
              isAuthenticated: false,
              user: action.payload
            }
    default:
      return state
  }
}