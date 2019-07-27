import React, { useState } from 'react'
import blueMapPin from '../blueMapPin.png'
import flippy from '../flippy.gif'

export default function DisplayContainer({text, name}){
    const [hovered, setHovered] = useState(false)
    const [popUp, setPopup] = useState(false)

    const handleMouseOver = () => {
        setHovered(true)
    }

    const handleMouseOut = () => {
        setHovered(false)
    }

    const handleClick = () => {
        setPopup(!popUp)
    }
    return (
        <div style={{width: '30px', height: '40px'}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
           { popUp ? <div style={{width: '30px', height: '40px', color: 'red', fontSize: 30}}>{text}</div>: (
                hovered ? 
            <div>
                <img 
                style={{width: '30px', height: '40px'}} 
                src={blueMapPin}
                alt="blue map pin"
                />{text}
            </div>
            :
            <div>
                <img 
                style={{width: '20px', height: '25px'}} 
                src={blueMapPin}
                alt="blue map pin"
                />{text}
            </div>
    )}
        </div>
        
    )
}
