import React from 'react'
import BoulderListItem from '../BoulderListItem/BoulderListItem'
import CampListItem from '../CampListItem'
import HikeListItem from '../HikeListItem'

export default ({boulders, camps, hikes, toggleFullPage, sortFilter, sort}) => {
    const sortedHikes = sort(hikes, sortFilter)
    const sortedCamps = sort(camps, sortFilter)
    const sortedBoulders = sort(boulders, sortFilter)
    return (
        <div className="list-page" 
            // style={{display: 'flex', flexDirection: 'column'}}
        >
            <div className="list-title-bar" style={{width: '100%'}}>
                <div className="list-title">Campgrounds</div>
                <div className="list-title">Hiking Trails</div>
                <div className="list-title">Boulder Problems</div>
            </div>
            <div 
                className="list-page-body"
                // style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', position: 'fixed', top: '15vh', height: '85vh'}}
            >
                <div style={{overflowY: 'scroll', width: '30%'}}>
                {sortedCamps.map((c, i)=> {
                    return <CampListItem toggleFullPage={() => toggleFullPage(c, 'camp')} name={c.name} area={c.area} key={`camp${i}`} image={c.imgUrl}/>
                })}
                </div>
                <div style={{overflowY: 'scroll', width: '30%'}}>
                {sortedHikes.map((h, i)=> {
                    return <HikeListItem toggleFullPage={() => toggleFullPage(h, 'hike')} name={h.name} area={h.area} key={`hike${i}`} image={h.imgMedium}/>
                })}
                </div>
                <div style={{overflowY: 'scroll', width: '30%'}}>
                {sortedBoulders.map((b, i)=> {
                    return <BoulderListItem toggleFullPage={() => toggleFullPage(b, 'boulder')} name={b.name} area={b.location[0]} key={`boulder${i}`} image={b.imgSmall ? b.imgSmall : b.imgMedium}/>
                })}
                </div>
            </div>
        </div>
    )
}