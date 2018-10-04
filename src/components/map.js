import React, {Component, Fragment} from 'react';
import ReactMapboxGl, { Marker, Cluster } from 'react-mapbox-gl';
import EventDetail from './EventDetail'
import {connect} from 'react-redux'
import {selectEvent} from '../redux/actions'


const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
});

const clusterMarkerStyle= {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #56C498',
    cursor: 'pointer'
  }

const markerStyle= {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  }


class MapContainer extends Component{
  state={
    center: [-96, 37.8],
    zoom: [4]
  }

  geojson=()=>{
    let workingEvents = this.props.events
    if (this.props.filterEvents.length > 0 && this.props.filterEvents[0] !== 'empty'){
      workingEvents = this.props.filterEvents
    }

    let geo = workingEvents.map(event=>{

      return(
        {
          id: event.id,
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(event.location.split(' ')[0]), parseFloat(event.location.split(' ')[1])]
          },
          properties: {
            title: event.title,
            description: event.description,
            picture: event.picture,
            type: event.event_type,
            dressCode: event.dress_code,
            openTo: event.open_to,
            likes: event.likes,
            rating: event.rating,
            price: event.price,
            closingTime: event.closing_time
          }
        }
      )
    })
    return {type: "FeatureCollection", features: geo}
  }

  componentDidMount=()=>{
    navigator.geolocation.getCurrentPosition(p=> this.setState({center: [p.coords.longitude, p.coords.latitude]}))
  }

  clusterMarker = (coordinates, pointCount) => (
    <Marker coordinates={coordinates} key={coordinates.toString()} style={clusterMarkerStyle}>
      <div>{pointCount}</div>
    </Marker>
  )

  handleClick= feature=>{
    this.props.selectEvent(feature.id)
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [8]
    })
  }

  render(){
    return(
      <Fragment>
        <h4 style={{textAlign: 'center', margin: '50px 0px 20px 0px'}}>Track events all over the world in real time</h4>
        <Map
        style='mapbox://styles/mapbox/streets-v10'
        center= {this.state.center}
        zoom= {this.state.zoom}
        className='myMap'
        containerStyle={{
          height: "60vh",
          width: "75vw",
        }}>

        <Cluster ClusterMarkerFactory={this.clusterMarker}>
          {this.geojson().features.map(feature => (
            <Marker
              key={feature.id}
              style={markerStyle}
              coordinates={feature.geometry.coordinates}
              data-feature={feature}
              onClick={()=>this.handleClick(feature)}
            >
              <div data-set={feature} title={feature.properties.title}>
                E
              </div>
            </Marker>
          ))}
        </Cluster>
        </Map>
        {this.props.currentEvent !== null ?
        <EventDetail />
        : null }
      </Fragment>
    )
  }

}

const mapStateToPros= state=>{
  return {
    events: state.events.all.filter(event=> event.active === true),
    filterEvents: state.events.filter,
    users: state.user.all,
    currentEvent: state.events.selected
  }
}

export default connect(mapStateToPros, {selectEvent})(MapContainer)
