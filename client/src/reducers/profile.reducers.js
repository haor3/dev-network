import {
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  PROFILE_FOUND
} from '../actions/types'

const initialState = {
  isLoading: false,
  profile: null
}

export const profileState = (state=initialState, action={}) => {
  switch(action.type){
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case PROFILE_FOUND:
      return {
        ...state,
        isLoading: false,
        profile: action.payload
      }
    case PROFILE_NOT_FOUND:
      return {
        ...state,
        isLoading: false,
        profile: action.payload
      }
    default:
      return state
  }
}