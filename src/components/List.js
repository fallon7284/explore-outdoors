import React from 'react'
import BoulderListItem from './BoulderListItem'
import CampListItem from './CampListItem'
import HikeListItem from './HikeListItem'

export default ({boulders, camps, hikes, toggleFullPage, sortFilter, sort}) => {
    console.log(sortFilter)
    return (
        <div className="list-page" >
            <div className="list-title-bar">
                <div className="list-title">Campgrounds</div>
                <div className="list-title">Hiking Trails</div>
                <div className="list-title">Boulder Problems</div>
            </div>
            <div className="list-page-body">
                {/* <div className="list-section">
                {sort(camps, sortFilter).map((c, i)=> {
                    return <CampListItem toggleFullPage={() => toggleFullPage(c, 'camp')} name={c.name} area={c.area} key={`camp${i}`}/>
                })}
                </div> */}
                <div className="list-section">
                {sort(hikes, sortFilter).map((h, i)=> {
                    return <HikeListItem toggleFullPage={() => toggleFullPage(h, 'hike')} name={h.name} area={h.area} key={`hike${i}`}/>
                })}
                </div>
                {/* <div className="list-section">
                {sort(boulders, sortFilter).map((b, i)=> {
                    return <BoulderListItem toggleFullPage={() => toggleFullPage(b, 'boulder')} name={b.name} area={b.location[0]} key={`boulder${i}`}/>
                })}
                </div> */}
            </div>
        </div>
    )
}