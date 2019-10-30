import React from 'react'

export default ({area, toggleFullPage}) => {
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
                {area.imgMedium && 
                <img alt="trail" src={area.imgMedium} style={{maxHeight: '100%', maxWidth: '100%', alignSelf: 'center', justifySelf: 'center'}}/>}
                <div style={{top: 'calc(50% + 25px)', color: 'black', backgroundColor: 'white', marginLeft: '.5vh'}}>
                    <h3>Location: </h3>
                    {Array.isArray(area.location) ? <ul>
                        Location: 
                        {area.location.map(l => <li>{l}</li>)}
                    </ul> : 
                    <div>{area.location}</div>}
                    <h3>Difficulty:</h3>
                    <p>{area.difficulty}</p>
                    <h3>Ascent:</h3>
                    <p>{area.ascent}</p>
                </div>
                <div style={{top: 'calc(50% + 25px)', color: 'black', backgroundColor: 'white', marginLeft: '.5vh'}}>
                    <h3>Distance:</h3>
                    <p>{area.length} miles</p>
                    {area.summary.length && 
                    <div>
                        <h3>Summary:</h3>
                        <p>{area.summary}</p>
                    </div> }
                </div>
            </div>
        </div>
    )
}