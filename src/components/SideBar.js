import React from 'react'
import ToggleCategoryButton from './ToggleCategoryButton';
import LocationButton from './LocationButton'
import ToggleViewButton from './ToggleViewButton';
import SortByButton from './SortByButton'
import { connect } from 'react-redux'
import { toggleMapView } from '../reducers/views'
import { setFilter } from '../reducers/filters'


const SideBar = (props) => {
    return (
        <div className="side-bar">
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
        setFilter: (filter) => dispatch(setFilter(filter))
    }
}

export default connect(mapState, mapDispatch)(SideBar)