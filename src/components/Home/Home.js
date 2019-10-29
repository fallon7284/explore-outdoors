import React from 'react'
import axios from 'axios'
import Map from '../Map/Map'
import FullPage from '../FullPage/FullPage'
import { connect } from 'react-redux'
import { toggleMapView, toggleOpenCard, toggleDetailView } from '../../reducers/views'
import { fetchLocation, fetchCustomLocation } from '../../reducers/location';


class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inputVal: '',
            zoom: 10,
            filter: {
                hikes: true,
                camps: true,
                boulders: true
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddressInput = this.handleAddressInput.bind(this)
        this.toggleFullPage = this.toggleFullPage.bind(this)
    }

    async componentDidMount(){
        this.props.fetchLocation()
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


    handleAddressInput(inputVal){
        this.props.fetchCustomLocation(inputVal)
    }

    handleChange(e){
        this.setState({inputVal: e.target.value})
    }


    render(){
        console.log(this.props.location, 'is my current location')
        return (
            <div
            >
                <Map
                    toggleFilters={this.toggleFilters.bind(this)} 
                    handleAddressInput={this.handleAddressInput.bind(this)}
                    className="map-body"
                    height={this.props.detailView ? '50vh' : '100vh'}
                    zoom={this.state.zoom}
                    center={this.props.location} 
                    filter={this.state.filter}
                    location={this.props.location}
                /> 

                <div>
                {this.props.detailView && <FullPage toggleFullPage={this.toggleFullPage} area={this.props.detailView} />}
                </div>  
            </div>     
        )
    }
}


const mapState = (state) => {
    return {
        location: state.location,
        openCard: state.openCard,
        detailView: state.views.detailView,
        mapView: state.views.mapView
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchLocation: () => dispatch(fetchLocation()),
        fetchCustomLocation: (location) => dispatch(fetchCustomLocation(location))
    }
}


export default connect(mapState, mapDispatch)(Home)