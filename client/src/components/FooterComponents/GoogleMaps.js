import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './../../styles/footer/footerBody.css'

const mapStyles = {
  width: '100%',
  height: '100%',
  fontSize: '5px',
  border: '3px solid black',
  borderRadius: '5px',
  marginTop: '-3px',
  marginBottom: '-3px',
  marginLeft: '-3px',
};

const containerStyle = {
    width: '250px',
    height: '250px',
  }


export class MapContainer extends Component {
  render() {
    return (
            <Map
            google={this.props.google}
            resetBoundsOnResize = {true}
            zoom={14}
            style={mapStyles}
            containerStyle={containerStyle}
            initialCenter={{lat: 48.5734053,lng: 7.7521113}}
            >
            <Marker position={{ lat: 48.5734053, lng: 7.7521113 }} />
            </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCG2zDrYiXeorJ0ulsTVBqkncq7VVJiSDY'
})(MapContainer);