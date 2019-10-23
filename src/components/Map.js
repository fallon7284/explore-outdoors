import React from 'react'
import GoogleMapReact from 'google-map-react'
import { mapsKey, hikingProjectKey, mountainProjectKey } from '../secrets'
import DisplayContainer from './DisplayContainer'
import axios from 'axios'
import List from './List/List'
import SideBar from './SideBar';
import { connect } from 'react-redux'
import { fetchHikes } from '../reducers/hikes'
import { fetchCamps } from '../reducers/camps'
import { fetchBoulders } from '../reducers/boulders'
const { getDistance } = require('../utilities')
 

 
class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      campgrounds: [],
      hikes: [],
      boulders: [],
    }
  }



  componentDidUpdate(oldProps){
    const newProps = this.props
    if (oldProps.myLocation !== newProps.myLocation){
      this.props.fetchCamps(newProps.myLocation.lat, newProps.myLocation.lng)
      this.props.fetchHikes(newProps.myLocation.lat, newProps.myLocation.lng)
      this.getBoulders(newProps.myLocation.lat, newProps.myLocation.lng)
    } else if (oldProps.center !== newProps.center){
      this.props.fetchCamps(newProps.center.lat, newProps.center.lng)
      this.props.fetchHikes(newProps.center.lat, newProps.center.lng)
      this.getBoulders(newProps.center.lat, newProps.center.lng)
    }
  }


  async getBoulders(lat, lng, maxV = 4, minV = 0){
    try{
      const { data } = await axios.get(`http://explore-outdoors-backend.herokuapp.com/boulders?lat=${lat}&lon=${lng}&maxDistance=50&minDiff=V${minV}&maxDiff=V${maxV}&key=${mountainProjectKey}`)
      let distancedData = data.map(boulder => {
        boulder.distance = getDistance(lat, lng, boulder.latitude, boulder.longitude)
        return boulder
      })
      this.setState({boulders: distancedData})
    } catch(error){
      console.log(error)
    }
  }

  sort(list, sortFilter){
    function compare( a, b ) {
      let one = a[sortFilter]
      let two = b[sortFilter]
      if ( one < two ){
        return -1;
      }
      if ( one > two ){
        return 1;
      }
      return 0;
    }

    return [...list].sort(compare)
  }

  render() {
    const { lat, lng, name } = this.props.center.lat && this.props.center.lng ? this.props.center : (this.props.pins[0] ? this.props.pins[0] : {lat: null, lng: null})
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
              <DisplayContainer
                lat={lat}
                lng={lng}
                text={name ? name : "Current Location"}
                type='current'
              />
              {this.props.filter.hikes && this.props.hikes.length && this.props.hikes.map((h, i) => {
                return (
                  <DisplayContainer
                  key={`maphikes${i}`}
                  lat={h.latitude}
                  lng={h.longitude}
                  toggleFullPage={this.props.toggleFullPage}
                  type='hike'
                  area={h}
                  />
                )
              })}
              {this.props.filter.camps && this.props.camps.length && this.props.camps.map((c, i) => {
                return (
                  <DisplayContainer 
                  key={`mapcamps${i}`}
                  lat={c.latitude}
                  lng={c.longitude}
                  toggleFullPage={this.props.toggleFullPage}
                  type='camp'
                  area={c}
                  />
                )
              })}
              {this.props.filter.boulders && this.state.boulders.length && this.state.boulders.map((c, i) => {
                return (
                  <DisplayContainer 
                  key={`mapboulders${i}`}
                  lat={c.latitude}
                  lng={c.longitude}
                  toggleFullPage={this.props.toggleFullPage}
                  type='boulder'
                  area={c}
                  />
                )
              })}
            </GoogleMapReact>
            </div>
              {!this.props.mapView && 
              <div>
                <List 
                sortFilter={this.props.sortFilter}
                sort={this.sort}
                height={this.props.height}
                toggleFullPage={this.props.toggleFullPage}
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
  return {
    location: state.location,
    hikes: state.hikes,
    boulders: state.boulders,
    camps: state.camps
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchHikes: (lat, lng) => dispatch(fetchHikes(lat, lng)),
    fetchCamps: (lat, lng) => dispatch(fetchCamps(lat, lng)),
    fetchBoulders: (lat, lng) => dispatch(fetchBoulders(lat, lng)),
  }
}

 
export default connect(mapState, mapDispatch)(Map)