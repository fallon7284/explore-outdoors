import React from 'react'
import SideButton from './SideButton';


export default class SideBar extends React.Component{
    constructor(){
        super()
    }
    
    render(){
        return (
            <div className="side-bar">
                <SideButton toggleFilters={this.props.toggleFilters} name="Hikes" backgroundColor="red"/>
                <SideButton toggleFilters={this.props.toggleFilters} name="Camps"/>
                <SideButton toggleFilters={this.props.toggleFilters} name="Pins"/>
                <SideButton toggleFilters={this.props.toggleFilters} name="button4"/>
            </div>
        )
    }
}