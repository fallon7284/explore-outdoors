import React, { useState } from 'react'
import SideButton from './SideButton'

export default ({toggleMapView, mapView}) => {
    
    return (
        <div onClick={toggleMapView}>
             <SideButton name={`See ${mapView ? 'List' : 'Map'} View`}/>
        </div>
    )
}