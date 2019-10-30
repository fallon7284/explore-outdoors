import React from 'react'
import './ListItem.css'

export default ({name, area, toggleFullPage, image}) => {
    return (
        <div className="list-item" onClick={toggleFullPage} style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
            <div >
                <img src={image} alt={name} style={{objectFit: 'contain'}}></img>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>{name}</div>
                <div>{area}</div>
            </div>
        </div>
    )
}