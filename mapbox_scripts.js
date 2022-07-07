mapboxgl.accessToken = 'pk.eyJ1IjoibmF3YWxuYXdhbDgiLCJhIjoiY2wzZ2Z5aG90MDBnYzNkazRyZ3Q0bXIzbyJ9.FJ2-Z0Ojx9-x9KypiL6Dbg';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy:true})

function successLocation(position) {
	const coordinates = document.getElementById('coordinates');
	const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [position.coords.longitude, position.coords.latitude],
	zoom: 15
	});

	
	const array_name = [  [-77.60780168774868, 37.64661378198247], [-77.62003193301352, 37.64913812521877], [-77.61339194978599, 37.65219343341886], [-77.59506967193107, 37.67609879848949], [-77.58934262388162, 37.67854158964255], [-77.58757907952905, 37.681505817171]   ]
	const descripts = [ "Spikeball", "Doubles Tennis", "90s Trivia Night", "The Martian Book Club Meeting", "3v3 Basketball", "Free Covid Testing" ]
	//const array_name = []
	
	// https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
	// try above for popup icons/data only on click
	for (let i = 0; i < array_name.length; i++) {
	
		var popup = new mapboxgl.Popup()
		  .setText(descripts[i])
		  .addTo(map);
	
		const marker = new mapboxgl.Marker({
		draggable: false
		})
		.setLngLat([array_name[i][0], array_name[i][1]])
		.addTo(map)
		.setPopup(popup);
	}
	 
	 
	// interactive marker here
	const marker = new mapboxgl.Marker({
	color: "#DC143C",
	draggable: true
	})
	.setLngLat([position.coords.longitude, position.coords.latitude])
	.addTo(map);

	function onDragEnd() {
	const lngLat = marker.getLngLat();
	coordinates.style.display = 'block';
	coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
	}
	 
	marker.on('dragend', onDragEnd);

	var createGeoJSONCircle = function(center, radiusInKm, points) {
		if(!points) points = 64;

		var coords = {
			latitude: center[1],
			longitude: center[0]
		};

		var km = radiusInKm;

		var ret = [];
		var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
		var distanceY = km/110.574;

		var theta, x, y;
		for(var i=0; i<points; i++) {
			theta = (i/points)*(2*Math.PI);
			x = distanceX*Math.cos(theta);
			y = distanceY*Math.sin(theta);

			ret.push([coords.longitude+x, coords.latitude+y]);
		}
		ret.push(ret[0]);

		return {
			"type": "geojson",
			"data": {
				"type": "FeatureCollection",
				"features": [{
					"type": "Feature",
					"geometry": {
						"type": "Polygon",
						"coordinates": [ret]
					}
				}]
			}
		};
	};

	// below block of code shows radius around current point
	/*map.on('style.load', function() {
    map.addSource("polygon", createGeoJSONCircle([position.coords.longitude, position.coords.latitude], 0.5));
	
	map.addLayer({
	"id": "polygon",
	"type": "fill",
	"source": "polygon",
	"layout": {},
	"paint": {
		"fill-color": "blue",
		"fill-opacity": 0.1
	}
	});
	
	});*/
	
	function drop_beekin(arr) {
		const lngLat = marker.getLngLat();
		//console.log([lngLat.lng, lngLat.lat])
		
		var description = prompt("Event description: ")
		
		//console.log(typeof description);
		
		/*const marker2 = new mapboxgl.Marker({
		draggable: false
		})
		.setLngLat([lngLat.lng, lngLat.lat])
		.addTo(map);*/
		
		//alert([lngLat.lng, lngLat.lat])
		
		if (typeof description === 'string' || description instanceof String) {
			
		
				var popup2 = new mapboxgl.Popup()
				  .setText(description)
				  .addTo(map);
				  
				const marker2 = new mapboxgl.Marker({
				draggable: false
				})
				.setLngLat([lngLat.lng, lngLat.lat])
				.addTo(map)
				.setPopup(popup2);
				
				//alert([lngLat.lng, lngLat.lat])
		}
		
		
	}
	
	// adding buttons
	map.on('idle', () => {
		// Enumerate ids of the layers.
		const toggleableLayerIds = ['drop a beekin'];
		
		// Set up the corresponding toggle button for each layer.
		for (const id of toggleableLayerIds) {
			// Skip layers that already have a button set up.
			if (document.getElementById(id)) {
				continue;
			}
			
			// Create a link.
			const link = document.createElement('a');
			link.id = id;
			link.href = '#';
			link.textContent = id;
			link.className = 'active';
			
			link.onclick = function() {drop_beekin(array_name)};
			
			const layers = document.getElementById('drop-beekin');
			layers.appendChild(link);
		
	}});
	
}

// write error location function after finalizing successlocation
function errorLocation() {
	const coordinates = document.getElementById('coordinates');
	const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-77.57659415017552, 37.68383060643072],
	zoom: 15
	});
	
	const array_name = [  [-77.60780168774868, 37.64661378198247], [-77.62003193301352, 37.64913812521877], [-77.61339194978599, 37.65219343341886], [-77.59506967193107, 37.67609879848949], [-77.58934262388162, 37.67854158964255], [-77.58757907952905, 37.681505817171]   ]
	const descripts = [ "Spikeball", "Doubles Tennis", "90s Trivia Night", "The Martian Book Club Meeting", "3v3 Basketball", "Free Covid Testing" ]
	//const array_name = []
	
	// https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
	// try above for popup icons/data only on click
	for (let i = 0; i < array_name.length; i++) {
	
		var popup = new mapboxgl.Popup()
		  .setText(descripts[i])
		  .addTo(map);
	
		const marker = new mapboxgl.Marker({
		draggable: false
		})
		.setLngLat([array_name[i][0], array_name[i][1]])
		.addTo(map)
		.setPopup(popup);
	}
	 
	 
	// interactive marker here
	const marker = new mapboxgl.Marker({
	color: "#DC143C",
	draggable: true
	})
	.setLngLat([-77.57659415017552, 37.68383060643072])
	.addTo(map);

	function onDragEnd() {
	const lngLat = marker.getLngLat();
	coordinates.style.display = 'block';
	coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
	}
	 
	marker.on('dragend', onDragEnd);
	
	function drop_beekin(arr) {
		const lngLat = marker.getLngLat();
		//console.log([lngLat.lng, lngLat.lat])
		
		var description = prompt("Event description: ")
		
		//console.log(typeof description);
		
		/*const marker2 = new mapboxgl.Marker({
		draggable: false
		})
		.setLngLat([lngLat.lng, lngLat.lat])
		.addTo(map);*/
		
		//alert([lngLat.lng, lngLat.lat])
		
		if (typeof description === 'string' || description instanceof String) {
			
		
				var popup2 = new mapboxgl.Popup()
				  .setText(description)
				  .addTo(map);
				  
				const marker2 = new mapboxgl.Marker({
				draggable: false
				})
				.setLngLat([lngLat.lng, lngLat.lat])
				.addTo(map)
				.setPopup(popup2);
				
				//alert([lngLat.lng, lngLat.lat])
		}
		
		
	}	
	
	// adding buttons
	map.on('idle', () => {
		// Enumerate ids of the layers.
		const toggleableLayerIds = ['drop a beekin'];
		
		// Set up the corresponding toggle button for each layer.
		for (const id of toggleableLayerIds) {
			// Skip layers that already have a button set up.
			if (document.getElementById(id)) {
				continue;
			}
			
			// Create a link.
			const link = document.createElement('a');
			link.id = id;
			link.href = '#';
			link.textContent = id;
			link.className = 'active';
			
			link.onclick = function() {drop_beekin(array_name)};
			
			const layers = document.getElementById('drop-beekin');
			layers.appendChild(link);
		
	}});	
}