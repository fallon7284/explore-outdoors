import React from 'react'
import ListItem from '.././ListItem/ListItem'

export default ({name, area, image}) => {
    return (
        <div>
            <ListItem name={name} area={area} image={image}/>
        </div>
    )
}