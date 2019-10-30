import React from 'react'
import BoulderListItem from '../BoulderListItem/BoulderListItem'
import CampListItem from '../CampListItem/CampListItem'
import HikeListItem from '../HikeListItem/HikeListItem'
import { sort } from '../../utilities'
import { connect } from 'react-redux';

const List = (props) => {
    const toggleFullPage = props.toggleFullPage
    const sortFilter = props.sortFilter
    const sortedHikes = sort(props.hikes, sortFilter)
    const sortedCamps = sort(props.camps, sortFilter)
    console.log(props.camps)
    const sortedBoulders = sort(props.boulders, sortFilter)
    return (
        <div className="list-page" >
            <div className="list-title-bar" style={{width: '88%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
                <div>Campgrounds
                    <div style={{overflowY: 'scroll', position: 'fixed', height: '100%', width: '25%', justifySelf: 'center'}}>
                    {sortedCamps.map((c, i)=> {
                        return <CampListItem toggleFullPage={() => toggleFullPage(c, 'camp')} name={c.name} area={c.area} key={`camp${i}`} image={c.imgUrl}/>
                    })}
                    </div>
                </div>
                <div>Hiking Trails
                    <div style={{overflowY: 'scroll', position: 'fixed', height: '100%', width: '25%', justifySelf: 'center'}}>
                    {sortedHikes.map((h, i)=> {
                        return <HikeListItem toggleFullPage={() => toggleFullPage(h, 'hike')} name={h.name} area={h.area} key={`hike${i}`} image={h.imgMedium}/>
                    })}
                    </div>
                </div>
                <div>Boulder Problems
                    <div style={{overflowY: 'scroll', position: 'fixed', height: '100%', width: '25%', justifySelf: 'center'}}>
                    {sortedBoulders.map((b, i)=> {
                        return <BoulderListItem toggleFullPage={() => toggleFullPage(b, 'boulder')} name={b.name} area={b.location[0]} key={`boulder${i}`} image={b.imgSmall ? b.imgSmall : b.imgMedium}/>
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        hikes: state.hikes,
        campes: state.camps,
        boulders: state.boulders
    }
}

export default connect(mapState)(List)