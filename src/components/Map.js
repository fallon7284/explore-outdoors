import React from 'react'
import GoogleMapReact from 'google-map-react'
import { mapsKey } from '../secrets'
import blueMapPin from '../blueMapPin.png'
 
const DisplayContainer = ({ src, text }) => <div><img style={{width: '20px', height: '25px'}} src={src} alt="blue map pin"/></div>;
 
class Map extends React.Component {

 
  render() {
    console.log(this.props.center)
    const { lat, lng } = this.props.center
    return (
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapsKey}}
          center={{lat, lng}}
          defaultCenter={this.props.center}
          defaultZoom={9}
        >
          <DisplayContainer
            lat={lat}
            lng={lng}
            src={blueMapPin}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map