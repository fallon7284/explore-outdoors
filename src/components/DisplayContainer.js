import React, { useState } from 'react'
import blueMapPin from '../images/blueMapPin.png'
import redPin from '../images/redpin.png'
import campPin from '../images/camp.png'
import hiker from '../images/hiker.jpg'
import DetailCard from './DetailCard'
import climber from '../images/climb.png'

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
        case 'boulder': 
            src = climber
            break
        default:
            src = blueMapPin
            break
    }

    return (
        <div style={{width: '30px', height: '40px', zIndex: '3'}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
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
