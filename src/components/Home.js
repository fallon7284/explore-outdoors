import React from 'react'
import axios from 'axios'
import { mapsKey } from '../secrets'
import Map from './Map'
import SideBar from './SideBar'
import FullPage from './FullPage'
import { connect } from 'react-redux'
import { fetchLocation } from '../reducers/location';




class Home extends React.Component{
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
            selectedItem: null,
            filter: {
                hikes: true,
                camps: true,
                boulders: true,
                pins: true
              },
            sortFilter: 'distance' 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddressInput = this.handleAddressInput.bind(this)
        this.getPinsFromDatabase = this.getPinsFromDatabase.bind(this)
        this.toggleFullPage = this.toggleFullPage.bind(this)
    }

    async componentDidMount(){
        this.props.fetchLocation()
    }

    toggleMapView(){
        this.setState({mapView: !this.state.mapView})
    }

    toggleFullPage(selectedItem = null, type){
        if (selectedItem){
            selectedItem.type = type
            
        }
        this.setState({selectedItem})
    }

    toggleFilters(name){
        name = name.toLowerCase()
        this.setState({filter: {...this.state.filter, [name]: !this.state.filter[name]}})
    }



    async setCustomLocation(add){
        if (add.length){
            add = add.split(' ').join('+')
            const data = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=${mapsKey}`)
            if(data.data.results.length){
                const { lat, lng } = data.data.results[0].geometry.location
                try{
                    this.setState({myLocation: { lat, lng }})
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

    setSortFilter(sortFilter){
        console.log('sorted by ', sortFilter)
        this.setState({sortFilter})
    }


    render(){
        console.log(this.props.location, 'is my current location')
        return (
            // <div className="app-body">
                /* <div>
                    <SideBar 
                        toggleFilters={this.toggleFilters.bind(this)} 
                        handleAddressInput={this.handleAddressInput.bind(this)}
                        toggleMapView={this.toggleMapView.bind(this)}
                        mapView={this.state.mapView}
                        setSortFilter={this.setSortFilter.bind(this)}
                    />
                </div> */
                <div
                    // className="map-page"
                >
                    <Map
                        toggleFilters={this.toggleFilters.bind(this)} 
                        handleAddressInput={this.handleAddressInput.bind(this)}
                        toggleMapView={this.toggleMapView.bind(this)}
                        mapView={this.state.mapView}
                        setSortFilter={this.setSortFilter.bind(this)}
                        className="map-body"
                        height={this.state.selectedItem ? '50vh' : '100vh'}
                        zoom={this.state.zoom}
                        pins={this.state.pins} 
                        center={this.state.address ? this.state.address : this.props.location} 
                        myLocation={this.props.location}
                        filter={this.state.filter}
                        mapView={this.state.mapView}
                        toggleFullPage={this.toggleFullPage}
                        sortFilter={this.state.sortFilter}
                    /> 

                    <div>
                    {this.state.selectedItem && <FullPage toggleFullPage={this.toggleFullPage} area={this.state.selectedItem} />}
                    </div>  
                </div>
            // </div>       
        )
    }
}


const mapState = (state) => {
    return {
        location: state.location
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchLocation: () => dispatch(fetchLocation())
    }
}


export default connect(mapState, mapDispatch)(Home)