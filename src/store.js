import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { registerState, loginState } from './reducers/user.reducers'
import { errorState } from './reducers/error.reducers'
import {profileState} from './reducers/profile.reducers'

const rootReducer = combineReducers({registerState, loginState, errorState, profileState})
const store = createStore(
                rootReducer, 
                compose(applyMiddleware(thunkMiddleware),
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
              )

export default store