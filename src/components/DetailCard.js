import React from 'react'

export default function DetailCard(props){
    let content
    console.log(props)
    switch(props.type){
        case 'camp':{
            content = <div style={{opacity: 1}}>
                <div>
                {props.area.name}
            </div>
            <div>
                {`This campground in ${props.area.location} has ${props.area.numCampsites} campsites available for reservation.`}
                {props.area.url && <a href={props.area.url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'white'}}>VISIT THIS CAMPSITE ONLINE</a>}
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
                {`This hike in ${props.area.location} climbs from a low of ${props.area.low}' to a high of ${props.area.high}' above sea level with a total ascent of ${props.area.ascent} over ${props.area.length} miles.`}
                {props.area.url && <a href={props.area.url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'white'}}>See this trail online</a>}
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
        <div style={{zIndex: '9999', backgroundColor: '#303030', borderTopLeftRadius: '10%', borderTopRightRadius: '10%', height: '18em', width: '18em', color: 'white', fontSize: '14px'}}>
            {content}
        </div>
    )
}