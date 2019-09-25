import React from 'react'

export default ({area, toggleFullPage}) => {
    console.log(area)
    return (
        <div style={{overflow: 'auto', left: '12%'}}>
            <div style={{position: 'fixed', backgroundColor: '#202020', color: 'white', width: '88%', height: '25px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div>
                    {area.name}
                </div>
                <div onClick={() => toggleFullPage()}>Close[X]</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {area.imgMedium && <div style={{backgroundColor: 'black', display: 'flex', flexDirection: 'column', height: 'calc(50% - 25px)', top: 'calc(50% + 25px)', width: '35%', position: 'fixed', justifyContent: 'space-around', overflow: 'hidden'}}>
                <img src={area.imgMedium} style={{objectFit: 'contain', width: '100%', position: 'relative', height: 'auto'}}/>
                </div>}
                <div style={{display: 'flex', flexDirection: 'column', position: 'relative', top: '25px', left: '100%', color: 'black'}}>
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