import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import co2Reducer from './reducers/co2Reducer'
import filterReducer from './reducers/filterReducer'
import populationReducer from './reducers/populationReducer'
/* import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import searchReducer from './reducers/searchReducer'
import usersReducer from './reducers/usersReducer' */

const reducer = combineReducers({
  co2: co2Reducer,
  filter: filterReducer,
  population: populationReducer
  /* notification: notificationReducer,
  user: userReducer,
  search: searchReducer,
  users: usersReducer, */
})

const store = createStore(
  reducer,
  (applyMiddleware(thunk))
)

export default store