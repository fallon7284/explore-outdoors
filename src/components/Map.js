import React from 'react'
import GoogleMapReact from 'google-map-react'
import { mapsKey, hikingProjectKey } from '../secrets'
import DisplayContainer from './DisplayContainer'
import axios from 'axios'
 

 
class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      campgrounds: []
    }
  }


  componentDidUpdate(oldProps){
    const newProps = this.props
    if (oldProps.myLocation !== newProps.myLocation){
      this.getCampgrounds(newProps.myLocation.lat, newProps.myLocation.lng)
    } else if (oldProps.center !== newProps.center){
      this.getCampgrounds(newProps.center.lat, newProps.center.lng)
    }
  }
  
  async getCampgrounds(lat, lng){
    // console.log(this.props)
    const { data } = await axios.get(`https://www.hikingproject.com/data/get-campgrounds?lat=${lat}&lon=${lng}&maxResults=500&maxDistance=200&key=${hikingProjectKey}`)
    const { campgrounds } = data
    this.setState({campgrounds})
  }

  render() {
    console.log(this.props)
    const { lat, lng, name } = this.props.center.lat && this.props.center.lng ? this.props.center : (this.props.pins[0] ? this.props.pins[0] : {lat: null, lng: null})
    return (
      <div style={{ height: '50vh', width: '50%' }}>
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
          />
          {this.props.pins.length && this.props.pins.map((p, i)=> {
            return (
            <DisplayContainer
            key={i}
            lat={p.lat}
            lng={p.lng}
            text={p.name}
            name={p.name ? p.name : ''}
          />
          )
        })}
          {this.state.campgrounds.length && this.state.campgrounds.map((c, i) => {
            return (
              <DisplayContainer 
              key={i}
              lat={c.latitude}
              lng={c.longitude}
              text={c.name}
              />
            )
          })}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map