import React from 'react'
import BoulderPage from '../BoulderPage/BoulderPage'
import HikePage from '../HikePage/HikePage'
import CampPage from '../CampPage/CampPage'

export default ({area, toggleFullPage}) => {
    let page
    switch(area.type){
        case 'boulder':
            page = <BoulderPage toggleFullPage={toggleFullPage} area={area} />
            break
        case 'hike':
            page = <HikePage toggleFullPage={toggleFullPage} area={area} />
            break
        case 'camp':
            page = <CampPage toggleFullPage={toggleFullPage} area={area} />
            break
        default:
            page = <div>Not Found</div>
    }
    return (
        <div style={{position: 'fixed', left: '12vw', zIndex: '9999', top: '50%'}}>
            {page}
        </div>
    )
}