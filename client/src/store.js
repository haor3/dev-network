import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { registerState, loginState } from './reducers/user.reducers'
import { errorState } from './reducers/error.reducers'

const rootReducer = combineReducers({registerState, loginState, errorState})
const store = createStore(
                rootReducer, 
                compose(applyMiddleware(thunkMiddleware),
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
              )

export default store