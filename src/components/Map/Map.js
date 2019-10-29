import React from 'react'
import GoogleMapReact from 'google-map-react'
import { mapsKey, mountainProjectKey } from '../../secrets'
import DisplayContainer from '../DisplayContainer/DisplayContainer'
import axios from 'axios'
import List from '../List/List'
import SideBar from '../SideBar/SideBar';
import { connect } from 'react-redux'
import { fetchHikes } from '../../reducers/hikes'
import { fetchCamps } from '../../reducers/camps'
import { fetchBoulders } from '../../reducers/boulders'
import { toggleOpenCard, toggleDetailView } from '../../reducers/views'
import DetailCard from '../DetailCard/DetailCard'
const { getDistance, sort } = require('../../utilities')
 

 
class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      campgrounds: [],
      hikes: [],
      boulders: [],
      poppedUp: null
    }
  }



  componentDidUpdate(oldProps){
    const newProps = this.props
    if (oldProps.location !== newProps.location){
      this.props.fetchCamps(newProps.location.lat, newProps.location.lng)
      this.props.fetchHikes(newProps.location.lat, newProps.location.lng)
      this.props.fetchBoulders(newProps.location.lat, newProps.location.lng)
    } else if (oldProps.center !== newProps.center){
      this.props.fetchCamps(newProps.center.lat, newProps.center.lng)
      this.props.fetchHikes(newProps.center.lat, newProps.center.lng)
      this.props.fetchBoulders(newProps.center.lat, newProps.center.lng)
    }
  }

  setPoppedUp(poppedUp){
    if (poppedUp === this.state.poppedUp){
      poppedUp = null
    }
    this.setState({poppedUp})
  }


  render() {
    console.log(this.props, this.state)
    const { lat, lng, name } = this.props.center
    const boulders = this.props.filter.boulders ? this.props.boulders : []
    const camps = this.props.filter.camps ? this.props.camps : []
    const hikes = this.props.filter.hikes ? this.props.hikes : []
    const pins = [...boulders, ...camps, ...hikes]
    return (
      <div 
        // style={{display: 'flex'}}
        className="map-page"
      >
        <SideBar 
          toggleFilters={this.props.toggleFilters} 
          handleAddressInput={this.props.handleAddressInput}
          toggleMapView={this.props.toggleMapView}
          mapView={this.props.mapView}
          setSortFilter={this.props.setSortFilter}
        />
        <div 
          // style={{position: 'fixed', left: '12vw'}}
        >
            <div 
              style={{
                position: 'fixed', 
                left: '12vw',
                height: this.props.height, 
                width: '100%', 
                alignSelf: 'center'
              }}
            >
            <GoogleMapReact
              bootstrapURLKeys={{ key: mapsKey }}
              center={{lat, lng}}
              defaultCenter={{lat: 0, lng: 0}}
              defaultZoom={this.props.zoom}
            >
              {pins.map((p, i) => {
                if (i === this.poppedUp){
                  return (
                    <DetailCard toggleFullPage={() => this.toggleDetailView(p)} type={p.type} area={p.area} handleClick={toggleOpenCard} />
                  )
                }
                else {
                  return (
                    <DisplayContainer
                      poppedUp={this.state.poppedUp}
                      key={`maphikes${i}`}
                      id={i}
                      lat={p.latitude}
                      lng={p.longitude}
                      toggleFullPage={() => this.props.toggleDetailView(p)}
                      area={p}
                      setPoppedUp={() => this.setPoppedUp(i)}
                      id={i}
                    />
                  )
                }
              })}
            </GoogleMapReact>
            </div>
              {!this.props.mapView && 
              <div>
                <List 
                sortFilter={this.props.sortFilter}
                height={this.props.height}
                toggleFullPage={this.props.toggleDetailView}
                camps={this.state.campgrounds} 
                hikes={this.state.hikes} 
                boulders={this.state.boulders}/>
              </div>}
            </div>
         </div>
    );
  }
}

const mapState = (state) => {
  console.log(state, 'from mapstate')
  return {
    location: state.location,
    hikes: state.hikes,
    boulders: state.boulders,
    camps: state.camps,
    mapView: state.views.mapView,
    sortFilter: state.filter,
    card: state.views.card
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchHikes: (lat, lng) => dispatch(fetchHikes(lat, lng)),
    fetchCamps: (lat, lng) => dispatch(fetchCamps(lat, lng)),
    fetchBoulders: (lat, lng) => dispatch(fetchBoulders(lat, lng)),
    toggleOpenCard: (card) => dispatch(toggleOpenCard(card)),
    toggleDetailView: (item) => dispatch(toggleDetailView(item)) 
  }
}

 
export default connect(mapState, mapDispatch)(Map)