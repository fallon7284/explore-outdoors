import React from 'react'
import axios from 'axios'
import Map from './Map'
import FullPage from './FullPage'
import { connect } from 'react-redux'
import { toggleMapView, toggleOpenCard, toggleDetailView } from '../reducers/views'
import { fetchLocation, fetchCustomLocation } from '../reducers/location';


class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inputVal: '',
            pins: [],
            campgrounds: [],
            zoom: 9,
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
            <div
            >
                <Map
                    toggleFilters={this.toggleFilters.bind(this)} 
                    handleAddressInput={this.handleAddressInput.bind(this)}
                    setSortFilter={this.setSortFilter.bind(this)}
                    className="map-body"
                    height={this.state.selectedItem ? '50vh' : '100vh'}
                    zoom={this.state.zoom}
                    center={this.props.location} 
                    filter={this.state.filter}
                    sortFilter={this.state.sortFilter}
                /> 

                <div>
                {this.state.selectedItem && <FullPage toggleFullPage={this.toggleFullPage} area={this.state.selectedItem} />}
                </div>  
            </div>     
        )
    }
}


const mapState = (state) => {
    return {
        location: state.location,
        openCard: state.openCard,
        detailView: state.detailView
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchLocation: () => dispatch(fetchLocation()),
        fetchCustomLocation: (location) => dispatch(fetchCustomLocation(location))
    }
}


export default connect(mapState, mapDispatch)(Home)