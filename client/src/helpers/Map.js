let makersReadyToRender = [];
const MARKERSCACHE = JSON.parse(localStorage.getItem('markers')) || {};
const markersIds = {};

function fetchLatLongs(markers, maps, callback) {
  let nextAddress = 0;
  let delay = 100;
  const geocoder = new maps.Geocoder();

  function getNextMarker() {
    if (nextAddress < markers.length) {
      (function(nextAddress) {
        setTimeout(
          function() {
            getAddress(markers[nextAddress], getNextMarker);
          },
          delay,
        );
      })(nextAddress++);
    } else {
      console.log("Finish loading markers");
    }
  }

  function getAddress(marker, next) {
    let position;
    let location;
    let address;

    if (!MARKERSCACHE[marker.Name]) { // if we have already cached marker
      address = marker.Address.toUpperCase();
      address = address.split(/C.P|\sCP|ENTRE/)[0];
      return geocoder.geocode({address: address}, function(results, status) {
        if (status === maps.GeocoderStatus.OK) {
          position = results[0];
          location = position.geometry.location;

          if (!markersIds[position.place_id]) { //Avoid duplicates
            marker.lat = location.lat();
            marker.lng = location.lng();
            makersReadyToRender.push(marker);
            callback(makersReadyToRender); // we set the maker to the map

            //saving in local database for faster rendering next time
            MARKERSCACHE[marker.Name] = marker;
            markersIds[position.place_id] = true;
            localStorage.setItem('markers', JSON.stringify(MARKERSCACHE));
          }

        } else {
          // === if we were sending the requests to fast, try this one again and increase the delay
          if (status === maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
          } else {
            console.log(`Geocode was not successful for the following reason: ${status} for marker ${address}`);
          }
        }
        next();
      });
    }
    // get chached markers
    makersReadyToRender.push(MARKERSCACHE[marker.Name]);
    callback(makersReadyToRender);
    next();
  };

  getNextMarker();
}

function addToFavs(name) {
  MARKERSCACHE[name].favorite = true;
  localStorage.setItem('markers', JSON.stringify(MARKERSCACHE));
}

const Map = {fetchLatLongs, addToFavs};

export default Map;
