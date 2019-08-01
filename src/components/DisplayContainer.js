import React, { useState } from 'react'
import blueMapPin from '../blueMapPin.png'
import redPin from '../redpin.png'
import campPin from '../camp.png'
import hiker from '../hiker.jpg'
import DetailCard from './DetailCard'

export default function DisplayContainer(props){
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

    let src
    switch (props.type){
        case 'pin':
            src = blueMapPin
            break
        case 'camp':
            src = campPin
            break
        case 'current': 
            src = redPin
            break
        case 'hike': 
            src = hiker
            break
        default:
            src = blueMapPin
            break
    }

    return (
        <div style={{width: '30px', height: '40px'}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
           { popUp ? <DetailCard type={props.type} area={props.area} handleClick={handleClick} />: (
                hovered ? 
            <div>
                <img 
                style={{width: '30px', height: '40px'}} 
                src={src}
                alt="map pin"
                />{props.text}
            </div>
            :
            <div>
                <img 
                style={{width: '20px', height: '25px'}} 
                src={src}
                alt="map pin"
                />
                {props.text}
            </div>
    )}
        </div>
        
    )
}
