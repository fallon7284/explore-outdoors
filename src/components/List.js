import React from 'react'
import BoulderListItem from './BoulderListItem'
import CampListItem from './CampListItem'
import HikeListItem from './HikeListItem'

export default ({boulders, camps, hikes}) => {
    return (
        <div className="list-page">
            <div className="list-section">
            {camps.map((c, i)=> {
                console.log(c)
                return <CampListItem name={c.name} area={c.area} key={`camp${i}`}/>
            })}
            </div>
            <div className="list-section">
            {hikes.map((h, i)=> {
                console.log(h)
                return <HikeListItem name={h.name} area={h.area} key={`hike${i}`}/>
            })}
            </div>
            <div className="list-section">
            {boulders.map((b, i)=> {
                console.log(b)
                return <BoulderListItem name={b.name} area={b.location[0]} key={`boulder${i}`}/>
            })}
            </div>
        </div>
    )
}