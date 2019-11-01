import React from 'react'
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import './List.css'
const { sort } = require('../../utilities')

const List = (props) => {
    const toggleFullPage = props.toggleFullPage
    const sortFilter = props.sortFilter
    const sortedHikes = sort(props.hikes, sortFilter)
    const sortedCamps = sort(props.camps, sortFilter)
    const sortedBoulders = sort(props.boulders, sortFilter)
    const titleStyle = {color: 'white', fontWeight: 'bold'}
    const cardStyle = {color: 'black', fontWeight: '300'}
    return (
        <div className="list-page" >
            <div 
            style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', backgroundColor: 'rgb(21, 104, 0)'}}
            >
                <div style={titleStyle}>Campgrounds
                    <div style={{overflowY: 'scroll', position: 'fixed', height: '100%', width: '30%', justifyContent: 'space-around'}}>
                    {sortedCamps.length ? sortedCamps.map((c, i)=> {
                        return (
                            <div style={{marginBottom: '1%'}}>
                                <Card key={`camp${i}`} text="black" onClick={() => toggleFullPage(c, 'camp')} style={{marginBottom: '2%', cursor: 'pointer'}}>
                                    <Card.Img variant="top" src={c.imgUrl}></Card.Img>
                                    <Card.Body style={cardStyle}>
                                        <Card.Text >{c.name}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>  
                        )
                    }) : <div>No Campgrounds</div>}
                    </div>
                </div>
                <div style={titleStyle}>Hiking Trails
                    <div 
                    style={{overflowY: 'scroll', position: 'fixed', height: '100%', width: '28%', justifySelf: 'center'}}
                    >
                    {sortedHikes.map((h, i)=> {
                        return (
                        <Card key={`hike${i}`} text="black" onClick={() => toggleFullPage(h, 'hike')} style={{marginBottom: '2%', cursor: 'pointer'}}>
                            <Card.Img variant="top" src={h.imgMedium}></Card.Img>
                            <Card.Body style={cardStyle}>
                                <Card.Text >{h.name}</Card.Text>
                            </Card.Body>
                        </Card>
                        )
                    })}
                    </div>
                </div>
                <div style={titleStyle}>Boulder Problems
                    <div style={{overflowY: 'scroll', position: 'fixed', height: '100%', width: '28%', justifySelf: 'center', color: 'black'}}>
                    {sortedBoulders.map((b, i)=> {
                        return (
                            <Card key={`boulder${i}`} text="black" onClick={() => toggleFullPage(b, 'boulder')} style={{marginBottom: '2%', cursor: 'pointer'}}>
                                <Card.Img variant="top" src={b.imgMedium}></Card.Img>
                                <Card.Body style={cardStyle}>
                                    <Card.Text >{b.name}</Card.Text>
                                    <Card.Text >Rating: {b.rating}</Card.Text>
                                </Card.Body>
                            </Card>
                            )
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