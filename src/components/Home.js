import React from 'react'
import axios from 'axios'
import { mapsKey } from '../secrets'
import Map from './Map'
import SideBar from './SideBar'



export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inputVal: '',
            address: null,
            myLocation: {lat: null, lng: null},
            pins: [],
            campgrounds: [],
            zoom: 9,
            findHikes: true,
            findCamps: false,
            mapView: true,
            filter: {
                hikes: true,
                camps: true,
                boulders: true,
                pins: true
              }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddressInput = this.handleAddressInput.bind(this)
        this.getPinsFromDatabase = this.getPinsFromDatabase.bind(this)
    }

    async componentDidMount(){
        this.getPinsFromDatabase()
        this.getLocation()
    }

    toggleMapView(){
        this.setState({mapView: !this.state.mapView})
    }

    toggleFilters(name){
        name = name.toLowerCase()
        this.setState({filter: {...this.state.filter, [name]: !this.state.filter[name]}})
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
            if(data.data.results.length){
                const { lat, lng } = data.data.results[0].geometry.location
                const { formatted_address } = data.data.results[0]
                const address = {lat, lng, name: add.split('+').join(' '), formatted_address}
                try{
                    const pins = await axios.post('http://explore-outdoors-backend.herokuapp.com/pins', address)
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
            const response = await axios.get('http://explore-outdoors-backend.herokuapp.com/pins')
            const pins = response.data
            this.setState({pins: [...this.state.pins, ...pins]})
        } catch(error){
            console.log(error)
        }
    }


    handleAddressInput(inputVal){
        this.setCustomLocation(inputVal)
        this.setState({inputVal: ''})
    }

    handleChange(e){
        this.setState({inputVal: e.target.value})
    }


    render(){
        return (
            <div className="background">
                <SideBar 
                    toggleFilters={this.toggleFilters.bind(this)} 
                    handleAddressInput={this.handleAddressInput.bind(this)}
                    toggleMapView={this.toggleMapView.bind(this)}
                    mapView={this.state.mapView}
                />
                <div className="map-section">
                    <Map 
                    className="map"
                    zoom={this.state.zoom}
                    pins={this.state.pins} 
                    center={this.state.address ? this.state.address : this.state.myLocation} 
                    myLocation={this.state.myLocation}
                    filter={this.state.filter}
                    mapView={this.state.mapView}
                    /> 
                </div>
            </div>       
        )
    }
}
