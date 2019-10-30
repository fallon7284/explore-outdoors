import React from 'react'
import GoogleMapReact from 'google-map-react'
import DisplayContainer from '../DisplayContainer/DisplayContainer'
import List from '../List/List'
import SideBar from '../SideBar/SideBar';
import { connect } from 'react-redux'
import { fetchHikes } from '../../redux/hikes'
import { fetchCamps } from '../../redux/camps'
import { fetchBoulders } from '../../redux/boulders'
import { toggleOpenCard, toggleFullPage } from '../../redux/views'
import DetailCard from '../DetailCard/DetailCard'
 

 
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
    const { lat, lng } = this.props.center
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
              bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
              center={{lat, lng}}
              defaultCenter={{lat: 0, lng: 0}}
              defaultZoom={this.props.zoom}
            >
              {pins.map((p, i) => {
                if (i === this.poppedUp){
                  return (
                    <DetailCard toggleFullPage={() => this.toggleFullPage(p)} type={p.type} area={p.area} handleClick={toggleOpenCard} />
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
                      toggleFullPage={() => this.props.toggleFullPage(p)}
                      area={p}
                      setPoppedUp={() => this.setPoppedUp(i)}
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
                toggleFullPage={this.props.toggleFullPage}
                camps={this.props.camps} 
                hikes={this.props.hikes} 
                boulders={this.props.boulders}/>
              </div>}
            </div>
         </div>
    );
  }
}

const mapState = (state) => {
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
    toggleFullPage: (item) => dispatch(toggleFullPage(item)) 
  }
}

 
export default connect(mapState, mapDispatch)(Map)