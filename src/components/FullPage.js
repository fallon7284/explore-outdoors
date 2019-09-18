import React from 'react'
import BoulderPage from './BoulderPage'
import HikePage from './HikePage'
import CampPage from './CampPage'

export default ({area}) => {
    let page
    switch(area.type){
        case 'boulder':
            page = <BoulderPage area={area} />
            break
        case 'hike':
            page = <HikePage area={area} />
            break
        case 'boulder':
            page = <CampPage area={area} />
            break
    }
    return (
        <div style={{height: '100%', width: '100%', zIndex: 9999}}>
            {page}
        </div>
    )
}