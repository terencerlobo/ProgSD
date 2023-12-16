import React, { Component } from 'react';
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Circle,
  Polyline,
} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

class LiveLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lati: this.props.center.lat,
      long: this.props.center.lng,
      showingInfoWindow: false,
      directions: null,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onInfoWindowClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });
  };

  displayMarkers = () => {
    return this.props.store.map((stores, index) => {
      if (stores.state === 'broken' || stores.state === 'charging') {
        return (
          <Marker
            key={index}
            position={{ lat: stores.lat, lng: stores.lng }}
            id={stores.state}
            name={stores.id}
            onClick={this.onMarkerClick}
            icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
          ></Marker>
        );
      } else {
        return (
          <Marker
            key={index}
            position={{ lat: stores.lat, lng: stores.lng }}
            id={stores.state}
            name={stores.id}
            onClick={this.onMarkerClick}
            icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
          ></Marker>
        );
      }
    });
  };

  displayInfo = () => {
    if (
      this.state.selectedPlace.id === 'broken' ||
      this.state.selectedPlace.id === 'charging'
    ) {
      return (
        <InfoWindow
          key={this.state.selectedPlace.name}
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div id="content">
            <h1 id="firstHeading" class="firstHeading">
              {' '}
              Bicycle ID: {this.state.selectedPlace.name}{' '}
            </h1>
            <div id="bodyContent">
              <p>
                <b> The bicycle's ID is: {this.state.selectedPlace.name} </b>,
                and this bicycle's state is :{' '}
                <b>{this.state.selectedPlace.id} </b>
              </p>
              <p>you need to fix it</p>
              <button class="btn" id="send">
                fix it
              </button>
            </div>
          </div>
        </InfoWindow>
      );
    } else {
      return (
        <InfoWindow
          key={this.state.selectedPlace.name}
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div id="content">
            <h1 id="firstHeading" class="firstHeading">
              {' '}
              Bicycle ID: {this.state.selectedPlace.name}{' '}
            </h1>
            <div id="bodyContent">
              <p>
                <b> The bicycle's ID is: {this.state.selectedPlace.name} </b>,
                and this bicycle's state is :{' '}
                <b>{this.state.selectedPlace.id} </b>
              </p>
              <p>you can move it</p>
              <form id="loginform1" name="submit1" method="post">
                <p>
                  from <input id="car_id1" name="car_name1" type="text" />
                </p>
                <p>
                  to <input id="car_id2" name="car_name2" type="text" />
                </p>
                <button class="btn" id="send">
                  move it
                </button>
              </form>
            </div>
          </div>
        </InfoWindow>
      );
    }
  };

  displayId = () => {
    return this.props.store.map((stores, index) => {
      return <option>{stores.id}</option>;
    });
  };
  searchbyId = () => {
    var currene_id = document.getElementById('id_input').value;
    this.props.store.map((stores) => {
      if (stores.id == currene_id) {
        this.setState({
          lati: stores.lat,
          long: stores.lng,
        });
      }
    });
  };
  relocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lati: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lati: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    } else {
      alert('fail to get location');
    }
  }

  displayline = () => {
    var short_a, short_b;
    this.props.store.map((stores, index) => {
      var min = 100000;
      if (stores.state === 'broken' || stores.state === 'charging') {
        var distance =
          (this.state.lati - stores.lat) ** 2 +
          (this.state.long - stores.lng) ** 2;
        if (distance < min) {
          min = distance;
          short_a = stores.lat;
          short_b = stores.lng;
        }
      }
    });
    return (
      <Polyline
        path={[
          { lat: short_a, lng: short_b },
          { lat: this.state.lati, lng: this.state.long },
        ]}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    );
  };
  render() {
    return (
      <>
        <div>
          <div>
            <select id="id_input">{this.displayId()}</select>
            <button onClick={this.searchbyId}>search</button>
            <button onClick={this.relocation}>relocation</button>
          </div>
          <Map
            google={this.props.google}
            zoom={15}
            style={mapStyles}
            initialCenter={{
              lat: this.state.lati,
              lng: this.state.long,
            }}
          >
            <Marker
              position={{
                lat: this.state.lati,
                lng: this.state.long,
              }}
              onClick={this.onMarkerClick}
              icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
            ></Marker>
            <Circle
              radius={8000}
              center={{
                lat: 55.8730373,
                lng: -4.2921234,
              }}
              onMouseover={() => console.log('mouseover')}
              onClick={() => console.log('click')}
              onMouseout={() => console.log('mouseout')}
              strokeColor="transparent"
              strokeOpacity={0}
              strokeWeight={5}
              fillColor="#FF0000"
              fillOpacity={0.2}
            />
            {this.displayMarkers()}
            {this.displayInfo()}
            {this.displayline()}
          </Map>
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCWZOFzN-y2En9WSyytUOL0E1q6UCKlhWE',
})(LiveLocation);
