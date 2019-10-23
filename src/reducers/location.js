import axios from 'axios'
import { mapsKey } from '../secrets'

const SET_LOCATION = 'SET_LOCATION'

export const setLocation = (location) => {
    console.log('CALLS SET LOCATION ACTION')
    return {type: SET_LOCATION, location}
}


export const fetchCustomLocation = (add) => {
    return async (dispatch) => {
        if (add.length){
            add = add.split(' ').join('+')
            const data = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=${mapsKey}`)
            if(data.data.results.length){
                const location = data.data.results[0].geometry.location
                dispatch(setLocation(location))
            }
            else {
                alert('Location not found')
            }
        }
    }
}


export const fetchLocation = () => {
    return async (dispatch) => {
        const { data } = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${mapsKey}`)
        dispatch(setLocation(data.location))
    }
}


const initialState = {lat: null, lng: null}

const locationReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_LOCATION: {
            return action.location
        }
        default: {
            return state
        }    
    }
}

export default locationReducer