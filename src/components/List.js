import React from 'react'
import BoulderListItem from './BoulderListItem'
import CampListItem from './CampListItem'
import HikeListItem from './HikeListItem'

export default ({boulders, camps, hikes}) => {
    return (
        <div className="list-page">
            <div className="list-section">
            {camps.map(c => {
                <CampListItem name={c.name} area={c.area}/>
            })}
            </div>
            <div className="list-section">
            {hikes.map(h => {
                <HikeListItem name={h.name} area={h.area}/>
            })}
            </div>
            <div className="list-section">
            {boulders.map(b => {
                <BoulderListItem name={b.name} area={b.area}/>
            })}
            </div>
        </div>
    )
}