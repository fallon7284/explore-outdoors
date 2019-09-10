import React from 'react'

export default ({name, area}) => {
    return (
        <div className="list-item">
            <div>{name}</div>
            <div>{area}</div>
        </div>
    )
}