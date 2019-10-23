import React from 'react'
import ListItem from '../ListItem/ListItem'

export default ({name, area, toggleFullPage, image}) => {
    return (
        <div className="boulder-list-item">
            <ListItem toggleFullPage={toggleFullPage} name={name} area={area} image={image}/>
        </div>
    )
}