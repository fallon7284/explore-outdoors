import React from 'react'

export default ({area, toggleFullPage}) => {
    console.log(area)
    return (
        <div style={{overflowY: 'auto', left: '12%'}}>
            <div style={{position: 'fixed', backgroundColor: '#202020', color: 'white', width: '88%', height: '25px', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '70px'}}></div>
                <div>
                    {area.name}
                </div>
                <div onClick={() => toggleFullPage()} style={{justifySelf: 'flex-end', cursor: 'pointer', width: '70px'}}>Close[X]</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {area.imgMedium && <div style={{backgroundColor: 'black', display: 'flex', flexDirection: 'column', height: 'calc(50% - 25px)', top: 'calc(50% + 25px)', width: '35%', position: 'fixed', justifyContent: 'space-around', overflow: 'hidden'}}>
                <img alt="trail" src={area.imgMedium} style={{objectFit: 'cover', position: 'relative', height: 'auto'}}/>
                </div>}
                <div style={{display: 'inline-block', flexDirection: 'column', position: 'relative', top: '25px', left: '100%', color: 'black'}}>
                    {Array.isArray(area.location) ? <ul>
                        Location: 
                        {area.location.map(l => <li>{l}</li>)}
                    </ul> : 
                    <div>Location: {area.location}</div>}
                </div>
            </div>
        </div>
    )
}