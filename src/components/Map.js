import React from 'react'
import GoogleMapReact from 'google-map-react'
import { mapsKey, hikingProjectKey, mountainProjectKey } from '../secrets'
import DisplayContainer from './DisplayContainer'
import axios from 'axios'
import List from './List'
 

 
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
      this.getCampgrounds(newProps.myLocation.lat, newProps.myLocation.lng)
      this.getTrails(newProps.myLocation.lat, newProps.myLocation.lng)
      this.getBoulders(newProps.myLocation.lat, newProps.myLocation.lng)
    } else if (oldProps.center !== newProps.center){
      this.getCampgrounds(newProps.center.lat, newProps.center.lng)
      this.getTrails(newProps.center.lat, newProps.center.lng)
      this.getBoulders(newProps.center.lat, newProps.center.lng)
    }
  }
  
  async getCampgrounds(lat, lng){
    try{
      const { data } = await axios.get(`http://explore-outdoors-backend.herokuapp.com/camps?lat=${lat}&lon=${lng}&maxResults=50&maxDistance=50&key=${hikingProjectKey}`)
      this.setState({campgrounds: data})
    }catch(error){
      console.log(error)
    }
  }

  async getTrails(lat, lng){
    try{
      const { data } = await axios.get(`http://explore-outdoors-backend.herokuapp.com/hikes?lat=${lat}&lon=${lng}&maxResults=75&minStars=4&minLength=5&maxDistance=50&key=${hikingProjectKey}`)
      this.setState({hikes: data})
    } catch(error){
      console.log(error)
    }
  }

  async getBoulders(lat, lon, maxV = 4, minV = 0){
    try{
      const { data } = await axios.get(`http://explore-outdoors-backend.herokuapp.com/boulders?lat=${lat}&lon=${lon}&maxDistance=50&minDiff=V${minV}&maxDiff=V${maxV}&key=${mountainProjectKey}`)
      this.setState({boulders: data})
    } catch(error){
      console.log(error)
    }
  }

  render() {
    const { lat, lng, name } = this.props.center.lat && this.props.center.lng ? this.props.center : (this.props.pins[0] ? this.props.pins[0] : {lat: null, lng: null})
    return (
      <div>
        <div style={{position: 'fixed', left: '12vw'}}>
            <div style={{position: 'fixed', height: this.props.height, width: '100%', alignSelf: 'center'}}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: mapsKey}}
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
              {this.props.filter.pins && this.props.pins.length && this.props.pins.map((p, i)=> {
                return (
                <DisplayContainer
                key={i}
                lat={p.lat}
                lng={p.lng}
                locLat={lat}
                locLng={lng}
                text={p.name}
                name={p.name ? p.name : ''}
                toggleFullPage={this.props.toggleFullPage}
                type='pin'
              />
              )
            })}
              {this.props.filter.hikes && this.state.hikes.length && this.state.hikes.map((h, i) => {
                return (
                  <DisplayContainer
                  key={i}
                  lat={h.latitude}
                  lng={h.longitude}
                  locLat={lat}
                  locLng={lng}
                  text={h.name}
                  toggleFullPage={this.props.toggleFullPage}
                  type='hike'
                  area={h}
                  />
                )
              })}
              {this.props.filter.camps && this.state.campgrounds.length && this.state.campgrounds.map((c, i) => {
                return (
                  <DisplayContainer 
                  key={i}
                  lat={c.latitude}
                  lng={c.longitude}
                  locLat={lat}
                  locLng={lng}
                  text={c.name}
                  toggleFullPage={this.props.toggleFullPage}
                  type='camp'
                  area={c}
                  />
                )
              })}
              {this.props.filter.boulders && this.state.boulders.length && this.state.boulders.map((c, i) => {
                return (
                  <DisplayContainer 
                  key={i}
                  lat={c.latitude}
                  locLat={lat}
                  locLng={lng}
                  lng={c.longitude}
                  text={c.name}
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
            height={this.props.height}
            toggleFullPage={this.props.toggleFullPage}
            camps={this.state.campgrounds} 
            hikes={this.state.hikes} 
            boulders={this.state.boulders}/>


            {/* <div style={{position: 'fixed', width: '100%', display: 'flex', height: '100vh', justifyContent: 'space-evenly', backgroundColor: 'white', zIndex: 9999, top: 0}}>
              <div style={{flexGrow: '1'}}>
                Camps
              </div>
              <div style={{flexGrow: '1'}}>
                Hikes
              </div>
              <div style={{flexGrow: '1'}}>
                Boulders
              </div>
            </div> */}

            </div>

            }
            </div>
         </div>
    );
  }
}
 
export default Map