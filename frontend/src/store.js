import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import co2Reducer from './reducers/co2Reducer'
import filterReducer from './reducers/filterReducer'
import populationReducer from './reducers/populationReducer'

const reducer = combineReducers({
  co2: co2Reducer,
  filter: filterReducer,
  population: populationReducer
})

const store = createStore(
  reducer,
  (applyMiddleware(thunk))
)

export default store