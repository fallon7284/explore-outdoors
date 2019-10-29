import React, { useState } from 'react'

export default ({toggleFilters, name, backgroundColor}) => {
    backgroundColor = backgroundColor ? backgroundColor : 'rgb(200, 200, 200)'
    const [clicked, setClicked] = useState(false)
    const lineThrough = clicked ? 'line-through red' : 'none'
    return (
        <div
            onClick={() => {
                setClicked(!clicked)
                toggleFilters(name)
            }}
            className="toggle-category-button"
            style={{
                fontFamily: 'futura',
                color: 'white',
                textDecoration: lineThrough,
                cursor: 'pointer', 
                backgroundColor, 
                width: '95%', 
                height: '12vh', 
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'space-around',
                marginTop: '3px',
                }} 
        >
            {`${name}`}
        </div>
    )
}