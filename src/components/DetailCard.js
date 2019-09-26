import React from 'react'

export default function DetailCard(props){
    let content
    switch(props.type){
        case 'camp':{
            content = <div style={{opacity: 1}}>
                <div>
                {props.area.name}
            </div>
            <div>
                {`This campground in ${props.area.location} has ${props.area.numCampsites} campsites available for reservation and is ${props.area.distance.toFixed(1)} miles away from your location.`}
                <div onClick={() => props.toggleFullPage(props.area, props.type)} style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>See more!</div>
                <img style={{height: '100%', width: '100%', opacity: 1}} src={props.area.imgUrl} alt=''></img>
            </div>
            </div>
            break
            }
        case 'pin':{
            content = <div>
                pin location
            </div>
            break
        }
        case 'hike':{
            content = <div style={{opacity: 1}}>
            <div>
            {props.area.name}
            </div>
            <div>
                {`This hike in ${props.area.location} climbs from a low of ${props.area.low}' to a high of ${props.area.high}' above sea level with a total ascent of ${props.area.ascent} over ${props.area.length} miles and is ${props.area.distance.toFixed(1)} miles away from your location.`}
                <div onClick={() => props.toggleFullPage(props.area, props.type)} style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>See more!</div>
                <img style={{height: '100%', width: '100%', opacity: 1}} src={props.area.imgMedium} alt=''></img>
            </div>
            </div>
            break
        }
        case 'boulder':{
            content = <div style={{opacity: 1}}>
            <div>
            {props.area.name}
            </div>
            <div>
                {`This boulder in ${props.area.location[0]} is a ${props.area.rating} with a ${props.area.stars} star rating and is ${props.area.distance.toFixed(1)} miles away from your location.`}
                <div onClick={() => props.toggleFullPage(props.area, props.type)} style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>See more!</div>
                <img style={{height: '100%', width: '100%', opacity: 1}} src={props.area.imgMedium} alt=''></img>
            </div>
            </div>
            break
    }
        default: {
            content = <div>
                current location
                </div>
            break
        }    
    }
    return (
        <div style={{position: 'fixed', zIndex: '9999', backgroundColor: '#303030', borderTopLeftRadius: '10%', borderTopRightRadius: '10%', height: '18em', width: '18em', color: 'white', fontSize: '14px'}}>
            {content}
        </div>
    )
}