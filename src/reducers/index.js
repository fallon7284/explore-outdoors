import { combineReducers } from 'redux'
import hikesReducer from './hikes'
import locationReducer from './location';
import bouldersReducer from './boulders'
import campsReducer from './camps'
import viewsReducer from './views'

const rootReducer = combineReducers({
    hikes: hikesReducer,
    location: locationReducer,
    boulders: bouldersReducer,
    camps: campsReducer,
    views: viewsReducer
})

export default rootReducer