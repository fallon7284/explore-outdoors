import React from 'react'

export default ({name, area, toggleFullPage}) => {
    return (
        <div className="list-item" onClick={toggleFullPage}>
            <div>{name}</div>
            <div>{area}</div>
        </div>
    )
}