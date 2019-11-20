import React from 'react'
import ToggleCategoryButton from '../ToggleCategoryButton/ToggleCategoryButton';
import LocationButton from '../LocationButton/LocationButton'
import ToggleViewButton from '../ToggleViewButton/ToggleViewButton';
import SortByButton from '../SortByButton/SortByButton'
import { connect } from 'react-redux'
import { toggleMapView } from '../../redux/views'
import { setFilter } from '../../redux/filters'
import './SideBar.css'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
const logo = require('../../images/Explore Outdoors Logo.png')



const SideBar = (props) => {
    return (
        <div className="side-bar">
            <img src={logo} style={{width: '100%'}}></img>
            <ToggleCategoryButton toggleFilters={props.toggleFilters} name="Hikes"/>
            <ToggleCategoryButton toggleFilters={props.toggleFilters} name="Camps"/>
            <ToggleCategoryButton toggleFilters={props.toggleFilters} name="Boulders"/>
            <ToggleViewButton toggleMapView={props.toggleMapView} mapView={props.mapView}/>
            {!props.mapView && <SortByButton callback={props.setFilter} name="Sort List" />}
            <LocationButton callback={props.handleAddressInput} name="Set Location"/>
        </div>
    )
}

const mapState = (state) => {
    return {
        mapView: state.views.mapView
    }
}

const mapDispatch = (dispatch) => {
    return {
        toggleMapView: () => dispatch(toggleMapView()),
        setFilter: (filter) => dispatch(setFilter(filter)),
        // handleAddressInput: () dispatch()
    }
}

export default connect(mapState, mapDispatch)(SideBar)