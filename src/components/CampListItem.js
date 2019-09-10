import React from 'react'
import ListItem from './ListItem'

export default ({name, area}) => {
    return (
        <div className="camp-list-item">
            <ListItem name={name} area={area}/>
        </div>
    )
}