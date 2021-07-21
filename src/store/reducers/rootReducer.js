import { combineReducers } from 'redux'
import { mainPageReducer } from './mainPageReducer'
import { weatherCardReducer } from './weatherCardReducer'

export const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  weatherCard: weatherCardReducer,
})