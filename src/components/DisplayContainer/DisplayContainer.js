import React, { useState } from 'react'
import blueMapPin from '../../images/blueMapPin.png'
import redPin from '../../images/redpin.png'
import campPin from '../../images/camp.png'
import hiker from '../../images/hiker.PNG'
import DetailCard from '../DetailCard/DetailCard'
import climber from '../../images/climb.png'

export default function DisplayContainer(props){
    const [hovered, setHovered] = useState(false)
    const { setPoppedUp } = props

    const handleMouseOver = () => {
        setHovered(true)
        // setPoppedUp()
    }

    const handleMouseOut = () => {
        setHovered(false)
        // setPoppedUp()
    }

    const handleClick = () => {
        setPoppedUp()
    }

    const [width, height] = hovered ? ['30px', '40px'] : ['30px', '25px']

    let src
    let text = props.text ? props.text : props.area.name
    let name = ''


    switch (props.area.type){
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
            text = props.area.rating
            name = props.area.name
            break
        default:
            src = blueMapPin
            break
    }

    

    return (
        <div style={{width: '30px', height: '40px', zIndex: '3'}} 
            onMouseOver={handleMouseOver} 
            onMouseOut={handleMouseOut} 
            onClick={() => !(props.poppedUp === props.id) && handleClick()}
        >
           { 
            //    popUp
            props.poppedUp === props.id
                ? 
            <DetailCard 
                toggleFullPage={props.toggleFullPage} 
                type={props.type} 
                area={props.area} 
                handleClick={handleClick} 
                close={() => setPoppedUp()}
            />
           : 
            <div>
                <img 
                style={{width, height}} 
                src={src}
                alt="map pin"
                />{text}{hovered && '\n' + name}
            </div>
    }
        </div>
        
    )
}
