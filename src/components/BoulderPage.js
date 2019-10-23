import React from 'react'

export default ({area, toggleFullPage}) => {
    console.log(area)
    return (
        <div style={{overflow: 'auto', backgroundColor: '#202020', width: '88%', display: "flex", flexDirection: 'column'}}>
            <div style={{position: 'fixed', backgroundColor: '#202020', color: 'white', width: '88%', height: '25px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{width: '70px'}}>
                </div>
                <div>
                    {area.name}
                </div>
                <div onClick={() => toggleFullPage()} style={{cursor: 'pointer', width: '70px'}}>Close[X]
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', width: "100%", backgroundColor: '#cecece'}}>
                {area.imgMedium && 
                <div style={{backgroundColor: 'black', display: 'flex', flexDirection: 'column', height: 'calc(50% - 25px)', top: 'calc(50% + 25px)', width: '35%', position: 'fixed', justifyContent: 'space-around', overflow: 'hidden'}}>
                    <img alt="boulder" src={area.imgMedium} style={{objectFit: 'contain', width: '100%', position: 'relative', height: 'auto'}}/>
                </div>}
                <div style={{display: 'flex', flexDirection: 'column', position: 'relative', top: '25px', left: '100%', color: 'black'}}>
                    {Array.isArray(area.location) ? <ul>
                        Location: 
                        {area.location.map((l, i)=> <li key={i}>{l}</li>)}
                    </ul> : 
                    <div>Location: {area.location}</div>}
                </div>
            </div>
        </div>
    )
}