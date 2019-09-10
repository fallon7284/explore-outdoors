import React from 'react'
import ToggleCategoryButton from './ToggleCategoryButton';
import LocationButton from './LocationButton'
import ToggleViewButton from './ToggleViewButton';


export default (props) => {
    return (
        <div className="side-bar">
            <ToggleCategoryButton toggleFilters={props.toggleFilters} name="Hikes"/>
            <ToggleCategoryButton toggleFilters={props.toggleFilters} name="Camps"/>
            <ToggleCategoryButton toggleFilters={props.toggleFilters} name="Pins"/>
            <ToggleCategoryButton toggleFilters={props.toggleFilters} name="Boulders"/>
            <ToggleViewButton toggleMapView={props.toggleMapView} mapView={props.mapView}/>
            <LocationButton callback={props.handleAddressInput} name="Set Location"/>
        </div>
    )
}