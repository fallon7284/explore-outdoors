import React from 'react'
import GoogleMapReact from 'google-map-react'
import { mapsKey, hikingProjectKey, mountainProjectKey } from '../secrets'
import DisplayContainer from './DisplayContainer'
import axios from 'axios'
 

 
class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      campgrounds: [],
      hikes: [],
      boulders: []
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
      const { data } = await axios.get(`https://www.hikingproject.com/data/get-campgrounds?lat=${lat}&lon=${lng}&maxResults=50&maxDistance=50&key=${hikingProjectKey}`)
      console.log(data)
      const campgrounds = data.campgrounds.filter(c => {return c.isCampground && c.numCampsites > 0})
      const formattedCampgrounds = campgrounds.map(c => {
        const { imgUrl, name, location, latitude, longitude, isBookable, isCampground, url, numCampsites } = c
        return { imgUrl, name, location, latitude, longitude, isBookable, isCampground, url, numCampsites}
      })
      const camps = await axios.post('http://explore-outdoors-backend.herokuapp.com/camps', formattedCampgrounds)
      this.setState({campgrounds: [...this.state.campgrounds, ...camps.data]})
    }catch(error){
      console.log(error)
    }
  }

  async getTrails(lat, lng){
    try{
      const { data } = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxResults=75&minStars=4&minLength=5&maxDistance=50&key=${hikingProjectKey}`)
      const formattedHikes = data.trails.map(t => {
        const { ascent, conditionDetails, conditionStatus, descent, difficulty, high, imgMedium, latitude,
          length, location, longitude, low, name, summary, url} = t
          return { ascent, conditionDetails, conditionStatus, descent, difficulty, high, imgMedium, latitude,
            length, location, longitude, low, name, summary, url}
      }) 
      const hikes = await axios.post('http://explore-outdoors-backend.herokuapp.com/hikes', formattedHikes)
      this.setState({hikes: [...this.state.hikes, ...hikes.data]})
    } catch(error){
      console.log(error)
    }
  }

  async getBoulders(lat, lng, maxV = 4, minV = 0){
    try{
      const { data } = await axios.get(`https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=${lng}&maxDistance=50&minDiff=V${minV}&maxDiff=V${maxV}&key=${mountainProjectKey}`)
      const formattedBoulders = data.routes.map(t => {
        const { name, rating, stars, location,
          latitude, longitude, imgSmall, imgMedium, url} = t
          return { name, rating, stars, location,
            latitude, longitude, imgSmall, imgMedium, url}
      }) 
      const boulders = await axios.post('http://explore-outdoors-backend.herokuapp.com/boulders', formattedBoulders)
      this.setState({boulders: [...this.state.boulders, ...boulders.data]})
    } catch(error){
      console.log(error)
    }
  }

  render() {
    const { lat, lng, name } = this.props.center.lat && this.props.center.lng ? this.props.center : (this.props.pins[0] ? this.props.pins[0] : {lat: null, lng: null})
    return (
      <div style={{ height: '50vh', width: '50%', alignSelf: 'center' }}>
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
            text={p.name}
            name={p.name ? p.name : ''}
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
              text={h.name}
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
              text={c.name}
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
              lng={c.longitude}
              text={c.name}
              type='boulder'
              area={c}
              />
            )
          })}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map