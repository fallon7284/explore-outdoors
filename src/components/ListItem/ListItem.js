import React from 'react'
import './ListItem.css'

export default ({name, area, toggleFullPage, image}) => {
    return (
        <div className="list-item" onClick={toggleFullPage} style={{display: 'flex', flexDirection: 'row', textAlign: 'center', width: '100%'}}>
            <div style={{width: '50%', objectFit: 'contain'}}>
                <img src={image} alt={name}></img>
            </div>
            <div style={{width: '50%', display: 'flex', flexDirection: 'column'}}>
                <div>{name}</div>
                <div>{area}</div>
            </div>
        </div>
    )
}