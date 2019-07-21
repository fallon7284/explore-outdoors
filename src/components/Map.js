import React from 'react'
import GoogleMapReact from 'google-map-react'
import { mapsKey } from '../secrets'
import DisplayContainer from './DisplayContainer'
 

 
class Map extends React.Component {
  render() {
    const { lat, lng } = this.props.center
    return (
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapsKey}}
          center={{lat, lng}}
          defaultCenter={{lat: 0, lng: 0}}
          defaultZoom={9}
        >
          <DisplayContainer
            lat={lat}
            lng={lng}
            text="Current Location"
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
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map