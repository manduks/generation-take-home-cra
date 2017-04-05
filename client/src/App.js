import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import API from './API';
import Marker from './map/Marker';
import Map from './helpers/Map';

import './App.css';

class App extends Component {
  static defaultProps = {
    center: {lat: 19.432608, lng: -99.133209},
    zoom: 11,
  };
  constructor() {
    super();
    this.onMapLoaded = this.onMapLoaded.bind(this);
    this.loadMarkers = this.loadMarkers.bind(this);
    this.updateMakers = this.updateMakers.bind(this);
    this.startLazyLoading = this.startLazyLoading.bind(this);
    this.loadNextBatch = this.loadNextBatch.bind(this);
    this.state = {
      markers: [],
    };
    this.params = {
      limit: 10,
      page: 1,
    };
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  updateMakers(markers) {
    this.setState({
      markers,
    });
  }
  startLazyLoading() {
    this.interval = setInterval(
      () => {
        this.loadNextBatch();
      },
      5 * 1000,
    );
  }
  loadNextBatch() {
    const params = this.params;
    this.params.skip = params.limit * params.page;
    this.params.page += 1;
    return this.loadMarkers();
  }
  loadMarkers() {
    API.search(this.params, markers => {
      console.log(markers);
      if (markers.length === 0) {
        return clearInterval(this.interval);
      }
      return Map.fetchLatLongs(markers, this.maps, this.updateMakers);
    });
  }
  renderMarkers() {
    return this.state.markers.map(m => <Marker {...m} />);
  }
  onMapLoaded({map, maps}) {
    this.maps = maps;
    this.loadMarkers();
    //this.startLazyLoading();
  }
  render() {
    return (
      <div className="App">
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={this.onMapLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {this.renderMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default App;
