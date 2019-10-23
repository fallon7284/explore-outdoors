import { combineReducers } from 'redux'
import hikesReducer from './hikes'

const rootReducer = combineReducers({
    hikes: hikesReducer
})

export default rootReducer