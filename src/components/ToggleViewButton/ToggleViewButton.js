import React from 'react'
import SideButton from '../SideButton/SideButton'

export default ({toggleMapView, mapView}) => {
    return (
        <div onClick={toggleMapView} className="button" style={{width: '95%', alignSelf: 'center', marginTop: '3px'}}>
             <SideButton name={`See ${mapView ? 'List' : 'Map'} View`}/>
        </div>
    )
}