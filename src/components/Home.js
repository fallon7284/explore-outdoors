import React from 'react'
import axios from 'axios'
import { mapsKey } from '../secrets'
import Map from './Map'



export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inputVal: '',
            address: null,
            location: {lat: null, lng: null}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddressInput = this.handleAddressInput.bind(this)
    }

    async componentDidMount(){
        const data = await this.getLocation()
        const location = data.location
        this.setState({location})
    }

    async getLocation(){
        const myLocation = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${mapsKey}`)
        console.log("CALLING LOCATION API", myLocation)
        return myLocation.data
    }

    async setCustomLocation(add){
        add = add.split(' ').join('+')
        const address = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=${mapsKey}`)
        console.log(address)
        this.setState({address})
    }

    handleAddressInput(e){
        e.preventDefault()
        console.log('SUBMITTED')
        this.setCustomLocation(this.state.inputVal)
        this.setState({inputVal: ''})
    }

    handleChange(e){
        this.setState({inputVal: e.target.value})
    }


    render(){
        let locDiv
        if (this.state.location){
            const { lat, lng } = this.state.location
            locDiv = <div>
                My location is {lat}, {lng}
            </div>
        }
        else {
            locDiv = <div></div>
        }
        
        return (
            <div>
                {locDiv}
                {/* <input placeholder="find address" onSubmit={this.handleAddressInput}></input><button type="submit"/> */}
                <form onSubmit={this.handleAddressInput}>
                        <label>
                            Find By Address
                            <input type="text" value={this.state.inputVal} onChange={this.handleChange}/>
                        </label>
                    <input type="submit" value="Submit" />
                </form>
                <Map center={this.state.address ? this.state.address.data.results[0].geometry.location : this.state.location} />
            </div>
            
        )
    }
}
