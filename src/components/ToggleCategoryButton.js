import React, { useState } from 'react'

export default ({toggleFilters, name, backgroundColor}) => {
    backgroundColor = backgroundColor ? backgroundColor : 'rgb(200, 200, 200)'
    const [clicked, setClicked] = useState(false)
    const lineThrough = clicked ? 'line-through' : 'none'
    return (
        <div
            onClick={() => {
                setClicked(!clicked)
                toggleFilters(name)
            }}
            className="toggle-category-button"
            style={{
                fontFamily: 'futura',
                textDecoration: lineThrough,
                cursor: 'pointer', 
                backgroundColor, 
                width: '100%', 
                height: '8vh', 
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'space-around',
                marginTop: '2px',
                }} 
        >
            {`-   ${name}   -`}
        </div>
    )
}