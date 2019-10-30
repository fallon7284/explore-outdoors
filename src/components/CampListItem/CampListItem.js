import React from 'react'
import ListItem from '.././ListItem/ListItem'

export default ({name, area, image}) => {
    console.log(area)
    return (
        <div className="camp-list-item">
            <ListItem name={name} area={area} image={image}/>
        </div>
    )
}