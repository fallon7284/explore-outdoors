import React from 'react'
import axios from 'axios'
import { mapsKey } from '../secrets'



export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            location: {location: null}
        }
    }

    async componentDidMount(){
        let location = await this.getLocation()
        this.setState({location})
    }

    async getLocation(){
        const myLocation = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${mapsKey}`)
        return myLocation.data
    }


    render(){
        let locDiv
        if (this.state.location.location){
            console.log(this.state.location.location)
            const { lat, lng } = this.state.location.location
            locDiv = <div>
                My location is {lat}, {lng}
            </div>
        }
        else {
            locDiv = <div></div>
        }
        
        return (
            locDiv
        )
    }
}
