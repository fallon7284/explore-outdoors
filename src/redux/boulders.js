import axios from 'axios'
const { getDistance } = require('../utilities')

// action types
const SET_BOULDERS = 'SET_BOULDERS'

const setBoulders = (boulders) => ({type: SET_BOULDERS, boulders})

export const fetchBoulders = (lat, lng, maxV = 4, minV = 0) => {
    return async dispatch => {
        const { data } = await axios.get(`http://explore-outdoors-backend.herokuapp.com/boulders?lat=${lat}&lon=${lng}&maxDistance=50&minDiff=V${minV}&maxDiff=V${maxV}&key=${process.env.REACT_APP_MOUNTAIN_KEY}`)
        let distancedData = data.map(boulder => {
            boulder.distance = getDistance(lat, lng, boulder.latitude, boulder.longitude)
            boulder.type = 'boulder'
            return boulder
          })
        dispatch(setBoulders(distancedData))
    }
}


const defaultBoulders = []

export default function(state = defaultBoulders, action){
    switch(action.type){
        case SET_BOULDERS: 
            return action.boulders
        default: 
            return [...state]
    }
}