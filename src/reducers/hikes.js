import { hikingProjectKey } from '../secrets'
import { getDistance } from '../utilities'
import axios from 'axios'

// action types
const SET_HIKES = 'SET_HIKES'

const setHikes = (hikes) => ({type: SET_HIKES, hikes})

export const fetchHikes = (lat, lng) => {
    return async (dispatch) => {
        const { data } = await axios.get(`http://explore-outdoors-backend.herokuapp.com/hikes?lat=${lat}&lon=${lng}&maxResults=75&minStars=4&minLength=5&maxDistance=50&key=${hikingProjectKey}`)
        let distancedData = data.map(hike => {
            hike.distance = getDistance(lat, lng, hike.latitude, hike.longitude)
            return hike
        })
        dispatch(setHikes(distancedData))
    }
} 


const defaultHikes = []

export default function(state = defaultHikes, action){
    switch(action.type){
        case SET_HIKES: 
            return action.hikes
        default: 
            return [...state]
    }
}