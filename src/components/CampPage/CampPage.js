import React from 'react'
import logo from '../../images/Explore Outdoors Logo.png'

export default ({area, toggleFullPage}) => {
    console.log(area)
    return (
        <div style={{position: 'fixed', color: 'white', width: '88%', height: '50%', left: '12%'}}>
            <div style={{display: 'flex', flexDirection: 'row', height: '25px', justifyContent: 'space-between', backgroundColor: '#202020'}}>
                <div style={{width: '70px'}}></div>
                    <div>
                        {area.name}
                        {area.rating && area.rating}
                    </div>
                <div onClick={() => toggleFullPage()} style={{cursor: 'pointer', width: '70px'}}>Close[X]</div>
            </div>
            <div style={{height: 'calc(100% - 25px)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', justifyContent: 'space-between', color: 'black'}}>
                <div style={{backgroundColor: 'white', width: '100%'}}>
                    <img alt="trail" src={area.imgUrl || logo} style={{maxHeight: '100%', maxWidth: '100%', alignSelf: 'center', justifySelf: 'center'}}/>
                </div>
                <div style={{top: 'calc(50% + 25px)', color: 'black', backgroundColor: 'white', paddingLeft: '.5vh'}}>
                    <h3>Location: </h3>
                    {Array.isArray(area.location) ? <ul>
                        Location: 
                        {area.location.map(l => <li>{l}</li>)}
                    </ul> : 
                    <div>{area.location}</div>}
                    <h3>Can be booked in advance:</h3>
                    <p>{area.isBookable ? 'true' : 'false'}</p>
                    <h3>Total campsites:</h3>
                    <p>{area.numCampsites}</p>
                    <a href={area.url} target='_blank' rel='noopener noreferrer'><h4>View online</h4></a>
                </div>
            </div>
        </div>
    )
}