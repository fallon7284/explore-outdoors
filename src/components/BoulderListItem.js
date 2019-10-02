import React from 'react'
import ListItem from './ListItem'

export default ({name, area, toggleFullPage}) => {
    return (
        <div className="boulder-list-item">
            <ListItem toggleFullPage={toggleFullPage} name={name} area={area}/>
        </div>
    )
}