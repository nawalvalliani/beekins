mapboxgl.accessToken = 'pk.eyJ1IjoibmF3YWxuYXdhbDgiLCJhIjoiY2wzZ2Z5aG90MDBnYzNkazRyZ3Q0bXIzbyJ9.FJ2-Z0Ojx9-x9KypiL6Dbg';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy:true})

function successLocation(position) {
	setupMap([position.coords.longitude, position.coords.latitude], 15)
}

function errorLocation() {
	setupMap([-77.03792381825399, 38.907894415381016], 10)
}

function setupMap(center, zoom) {
	const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: center,
	zoom: zoom
	})
	
	const nav = new mapboxgl.NavigationControl();
	map.addControl(nav)
	
	/*var directions = new MapboxDirections({
	  accessToken: mapboxgl.accessToken
	})

	map.addControl(directions, 'top-left');
	
	directions.setOrigin([position.coords.longitude, position.coords.latitude]);
	directions.setDestination([-77.64392778129357, 37.66223243389048])*/
	
	map.on('load', function() {
	  var directions = new MapboxDirections({
		accessToken: mapboxgl.accessToken
	  });
	  map.addControl(directions, 'top-left');

	  directions.setOrigin([center[0], center[1]]);

	  var dest_lng = document.getElementById('passed-longitude').innerText;
	  var dest_lat = document.getElementById('passed-latitude').innerText;
	  
	  directions.setDestination([dest_lng, dest_lat]);

	  //directions.setDestination([-77.61193433140933, 37.703444507643425]);
	});	
}



