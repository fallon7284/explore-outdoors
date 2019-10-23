import { combineReducers } from 'redux'
import hikesReducer from './hikes'
import locationReducer from './location';

const rootReducer = combineReducers({
    hikes: hikesReducer,
    location: locationReducer
})

export default rootReducer