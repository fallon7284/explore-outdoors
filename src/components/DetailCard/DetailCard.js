import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function DetailCard(props){
    let name = props.area.name
    let image, text
    switch(props.area.type){
        case 'camp':{
            image = props.area.imgUrl
            text = `This campground in ${props.area.location} has ${props.area.numCampsites} campsites available for reservation and is ${props.area.distance.toFixed(1)} miles away from your location.`
            break
            }
        case 'pin':{
            image = 'image'
            text = 'text'
            break
        }
        case 'hike':{
            text = `This hike in ${props.area.location} climbs from a low of ${props.area.low}' to a high of ${props.area.high}' above sea level with a total ascent of ${props.area.ascent} over ${props.area.length} miles and is ${props.area.distance.toFixed(1)} miles away from your location.`
            image = props.area.imgMedium
            break
        }
        case 'boulder':{
            name = props.area.name
            image = props.area.imgMedium
            text = `This boulder in ${props.area.location} is a ${props.area.rating} with a ${props.area.stars} star rating and is ${props.area.distance.toFixed(1)} miles away from your location.`
            break
    }
        default: {
            image = 'image'
            text = 'text'
            break
        }    
    }
    return (
        <div>
            <Card bg="success" text="white" style={{ width: '18rem', zIndex: '9999' }}>
                <button onClick={props.close} style={{
                    right: '5px',
                    top: '5px',
                    position: 'absolute', 
                    fontSize: '2em', 
                    width: 'auto', 
                    borderRadius: '100%'}}>X
                </button>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{text}</Card.Text>
                    <Button variant="light" onClick={() => props.toggleFullPage(props.area)}>See More</Button>
                </Card.Body>
            </Card>
        </div> 
    )
}