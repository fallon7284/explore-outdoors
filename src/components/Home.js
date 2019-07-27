import React from 'react'
import axios from 'axios'
import { mapsKey, hikingProjectKey } from '../secrets'
import Map from './Map'



export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inputVal: '',
            address: null,
            myLocation: {lat: null, lng: null},
            pins: [],
            campgrounds: [],
            zoom: 9
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddressInput = this.handleAddressInput.bind(this)
        this.getPinsFromDatabase = this.getPinsFromDatabase.bind(this)
    }

    async componentDidMount(){
        this.getPinsFromDatabase()
        this.getLocation()
    }


    async getLocation(){
        const myLocation = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${mapsKey}`)
        console.log("CALLING LOCATION API", myLocation)
        this.setState({myLocation: myLocation.data.location})
    }

    async setCustomLocation(add){
        if (add.length){
            add = add.split(' ').join('+')
            const data = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=${mapsKey}`)
            console.log(data.data.results)
            if(data.data.results.length){
                const { lat, lng } = data.data.results[0].geometry.location
                const { formatted_address } = data.data.results[0]
                const address = {lat, lng, name: add.split('+').join(' '), formatted_address}
                try{
                    const pins = await axios.post('http://localhost:3001/pins', address)
                    this.setState({address: pins.data})
                    this.setState({pins: [...this.state.pins, pins.data]})
                } catch(error){
                    console.log(error)
                }
            }
            
        }
    }

    async getPinsFromDatabase(){
        try{
            const response = await axios.get('http://localhost:3001/pins')
            const pins = response.data
            this.setState({pins: [...this.state.pins, ...pins]})
        } catch(error){
            console.log(error)
        }
    }


    handleAddressInput(e){
        e.preventDefault()
        this.setCustomLocation(this.state.inputVal)
        this.setState({inputVal: ''})
    }

    handleChange(e){
        this.setState({inputVal: e.target.value})
    }


    render(){
        console.log(this.state.myLocation)
        return (
            <div>
                <form onSubmit={this.handleAddressInput}>
                        <label>
                            Find By Address
                            <input type="text" value={this.state.inputVal} onChange={this.handleChange}/>
                        </label>
                    <input type="submit" value="Submit" />
                </form>
                <Map 
                zoom={this.state.zoom} 
                // campgrounds={this.state.campgrounds} 
                pins={this.state.pins} 
                center={this.state.address ? this.state.address : this.state.myLocation} 
                myLocation={this.state.myLocation}
                />
            </div>       
        )
    }
}
