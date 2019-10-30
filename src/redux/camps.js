import { getDistance } from '../utilities'
import axios from 'axios'
// action types
const SET_CAMPS = 'SET_CAMPS'

const setCamps = (camps) => ({type: SET_CAMPS, camps})

export const fetchCamps = (lat, lng) => {
    return async (dispatch) => {
        const { data } = await axios.get(`http://explore-outdoors-backend.herokuapp.com/camps?lat=${lat}&lon=${lng}&maxResults=50&maxDistance=50&key=${process.env.REACT_APP_HIKING_KEY}`)
        let distancedData = data.map(camp => {
            camp.distance = getDistance(lat, lng, camp.latitude, camp.longitude)
            camp.type = 'camp'
            return camp
        })
        dispatch(setCamps(distancedData))
    }
} 

const defaultCamps = []

export default function(state = defaultCamps, action){
    switch(action.type){
        case SET_CAMPS: 
            return action.camps
        default: 
            return [...state]
    }
}