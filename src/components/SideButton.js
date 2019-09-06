import React, { useState } from 'react'

export default ({toggleFilters, name, backgroundColor}) => {
    backgroundColor = backgroundColor ? backgroundColor : 'green'
    const [clicked, setClicked] = useState(false)
    const opacity = clicked ? .5 : 1
    const [onOff, setOnOff] = useState(true)
    const seeOrHide = onOff ? 'Hide' : 'See'
    return (
        <div
            onClick={() => {
                setClicked(!clicked)
                setOnOff(!onOff)
                toggleFilters(name)
            }}
            className="side-button"
            style={{
                cursor: 'pointer', 
                backgroundColor, 
                width: '100%', 
                height: '8vh', 
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'space-around',
                marginTop: '2px',
                opacity
                }} 
        >
            {`${seeOrHide} ${name}`}
        </div>
    )
}