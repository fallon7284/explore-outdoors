import React from 'react'
import ToggleCategoryButton from './ToggleCategoryButton';
import SideButton from './SideButton'
import LocationButton from './LocationButton'


export default class SideBar extends React.Component{
    constructor(){
        super()
    }
    
    render(){
        return (
            <div className="side-bar">
                <ToggleCategoryButton toggleFilters={this.props.toggleFilters} name="Hikes"/>
                <ToggleCategoryButton toggleFilters={this.props.toggleFilters} name="Camps"/>
                <ToggleCategoryButton toggleFilters={this.props.toggleFilters} name="Pins"/>
                <LocationButton callback={this.props.handleAddressInput} name="Set Location"/>
            </div>
        )
    }
}