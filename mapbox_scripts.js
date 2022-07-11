mapboxgl.accessToken = 'pk.eyJ1IjoibmF3YWxuYXdhbDgiLCJhIjoiY2wzZ2Z5aG90MDBnYzNkazRyZ3Q0bXIzbyJ9.FJ2-Z0Ojx9-x9KypiL6Dbg';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy:true})

function arePointsNear(checkPoint, centerPoint, miles, desc) {
  //var miles = km*0.621371
  var km = miles/0.621371
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  console.log(miles)
  //console.log(desc);
  //console.log(Math.sqrt(dx * dx + dy * dy));
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

function successLocation(position) {
	
	const coordinates = document.getElementById('coordinates');
	const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [position.coords.longitude, position.coords.latitude],
	zoom: 13
	});

	
	//const array_name = [  [-77.60780168774868, 37.64661378198247], [-77.62003193301352, 37.64913812521877], [-77.61339194978599, 37.65219343341886], [-77.59506967193107, 37.67609879848949], [-77.58934262388162, 37.67854158964255], [-77.58757907952905, 37.681505817171]   ]
	//const descripts = [ "Spikeball", "Doubles Tennis", "90s Trivia Night", "The Martian Book Club Meeting", "3v3 Basketball", "Free Covid Testing" ]
	const array_name = []
	const descripts = []

	$.ajax({
		url: "get.php",
		type: "GET",
		success: function(data) {
			
			var n = jQuery.parseJSON(data).length
			var parsed = jQuery.parseJSON(data)
			
			
			for (let i = 0; i < n; i++) {
				
				if(arePointsNear({lat: parsed[i]["latitude"], lng: parsed[i]["longitude"]}, {lat: position.coords.latitude, lng: position.coords.longitude}, 200.0, parsed[i]["description"])) {
					
					array_name.push( [parsed[i]["longitude"], parsed[i]["latitude"]] )
					descripts.push(parsed[i]["description"])
				
					var popup = new mapboxgl.Popup()
					  .setText(parsed[i]["description"])
					  .addTo(map);
					
					const marker = new mapboxgl.Marker({
					draggable: false
					})
					.setLngLat([parsed[i]["longitude"], parsed[i]["latitude"]])
					.addTo(map)
					.setPopup(popup);
					
					marker.getElement().addEventListener('click', () => { console.log(parsed[i]["description"]); });
				}
				
				
			}
			// https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
			// try above for popup icons/data only on click
			/*for (let i = 0; i < array_name.length; i++) {
			
				var popup = new mapboxgl.Popup()
				  .setText(descripts[i])
				  .addTo(map);
			
				const marker = new mapboxgl.Marker({
				draggable: false
				})
				.setLngLat([array_name[i][0], array_name[i][1]])
				.addTo(map)
				.setPopup(popup);
			}*/			
			//console.log(jQuery.parseJSON(data).length)
		},
		cache: false
	});


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
		
		var description = prompt("Event descriptionz: ")
		
		//console.log(typeof description);
		
		/*const marker2 = new mapboxgl.Marker({
		draggable: false
		})
		.setLngLat([lngLat.lng, lngLat.lat])
		.addTo(map);*/
		
		//alert([lngLat.lng, lngLat.lat])
		
		/*if (typeof description === 'string' || description instanceof String) {
			
		
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
		}*/
		
		$.ajax({
			url: "save.php",
			type: "POST",
			data: {
				description: description,
				longitude: lngLat.lng,
				latitude: lngLat.lat
			},
			success: function(response) { console.log("success") },
			cache: false
		});
		

		
		
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
	
	map.on('idle', () => {
		// Enumerate ids of the layers.
		const toggleableLayerIds = ['navigate'];
		
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
			
			//link.onclick = function() {drop_beekin(array_name)};
			
			const layers = document.getElementById('nav-button');
			layers.appendChild(link);
		
	}});	
	

	map.on('idle', () => {
		const layerList = document.getElementById('theme_select');
		const inputs = layerList.getElementsByTagName('input');
		
		for (const input of inputs) {
			input.onclick = (layer) => {
				const layerId = layer.target.id;
				map.setStyle('mapbox://styles/mapbox/' + layerId);
			};
		}
		
	});
}

// write error location function after finalizing successlocation
function errorLocation() {

}