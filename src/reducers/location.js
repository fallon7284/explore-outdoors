import axios from 'axios'
import { mapsKey } from '../secrets'

const SET_LOCATION = 'SET_LOCATION'

export const setLocation = (location) => {
    console.log('CALLS SET LOCATION ACTION')
    return {type: SET_LOCATION, location}
}



export const fetchLocation = () => {
    console.log("TRYING TO FETCH LOCATION FROM REDUX")
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