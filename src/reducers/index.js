import { combineReducers } from 'redux'
import hikesReducer from './hikes'
import locationReducer from './location';
import bouldersReducer from './boulders'
import campsReducer from './camps'

const rootReducer = combineReducers({
    hikes: hikesReducer,
    location: locationReducer,
    boulders: bouldersReducer,
    camps: campsReducer
})

export default rootReducer