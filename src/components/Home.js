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
            myLocation: {lat: null, lng: null},
            pins: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddressInput = this.handleAddressInput.bind(this)
        this.getPinsFromDatabase = this.getPinsFromDatabase.bind(this)
    }

    async componentDidMount(){
        const data = await this.getLocation()
        const myLocation = data.location
        this.setState({myLocation})
        this.getPinsFromDatabase()
    }

    async getLocation(){
        const myLocation = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${mapsKey}`)
        console.log("CALLING LOCATION API", myLocation)
        return myLocation.data
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
                    const pins = await axios.post('http://localhost:3001/pins', address)
                    console.log('total pins', pins)
                    this.setState({pins: pins.data})
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
            console.log("returned from fetch", response)
            this.setState({pins: [...this.state.pins, ...pins]})
        } catch(error){
            console.log(error)
        }
    }


    // doFetch(uri){
    //     let h = new Headers()
    //     h.append('Accept', 'application/json')

    //     let req = new Request(uri, {
    //         method: 'GET',
    //         headers: h,
    //         mode: 'cors'
    //     })

    //     console.log('req', req)

    //     fetch(req)
    //         .then((response) => {
    //             console.log(response)
    //             if(response.ok){
    //                 return response.json()
    //             }
    //             else {
    //                 throw new Error('OH SHIT OH SHIT OH SHIT')
    //             }
    //         })
    // }


    handleAddressInput(e){
        e.preventDefault()
        this.setCustomLocation(this.state.inputVal)
        this.setState({inputVal: ''})
    }

    handleChange(e){
        this.setState({inputVal: e.target.value})
    }


    render(){
        console.log(this.state.pins)
        return (
            <div>
                <form onSubmit={this.handleAddressInput}>
                        <label>
                            Find By Address
                            <input type="text" value={this.state.inputVal} onChange={this.handleChange}/>
                        </label>
                    <input type="submit" value="Submit" />
                </form>
                <Map state={this.state} pins={this.state.pins} center={this.state.address ? this.state.address.data.results[0].geometry.location : this.state.myLocation} />
            </div>       
        )
    }
}
