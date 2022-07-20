mapboxgl.accessToken = 'pk.eyJ1IjoibmF3YWxuYXdhbDgiLCJhIjoiY2wzZ2Z5aG90MDBnYzNkazRyZ3Q0bXIzbyJ9.FJ2-Z0Ojx9-x9KypiL6Dbg';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy:true})

function startNav() {
	var beekin_longitude = document.getElementById('beekin-longitude').innerText;
	var beekin_latitude = document.getElementById('beekin-latitude').innerText;

	var strink = "./navigate.php?q=" + beekin_longitude + "," + beekin_latitude;

	window.open(strink, "_blank");
}

function arePointsNear(checkPoint, centerPoint, miles, desc) {
  //var miles = km*0.621371
  var km = miles/0.621371
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

function get_style() {

	var map_style = "";

	if(sessionStorage.getItem("theme") == null){
		sessionStorage.setItem("theme", 1);
		map_style = 'mapbox://styles/mapbox/streets-v11';
		document.getElementById("streets-v11").checked = true;
	} else if(sessionStorage.getItem("theme") == "1"){
		map_style = 'mapbox://styles/mapbox/streets-v11';
		document.getElementById("streets-v11").checked = true;
	} else if(sessionStorage.getItem("theme") == "2"){
		map_style = 'mapbox://styles/mapbox/light-v10';
		document.getElementById("light-v10").checked = true;
	} else if(sessionStorage.getItem("theme") == "3"){
		map_style = 'mapbox://styles/mapbox/dark-v10';
		document.getElementById("dark-v10").checked = true;
	}

	return map_style;
}

function successLocation(position) {
	const coordinates = document.getElementById('coordinates');

	map_style = get_style();

	const map = new mapboxgl.Map({
	container: 'map',
	style: map_style,
	center: [position.coords.longitude, position.coords.latitude],
	zoom: 13
	});

	var slider = document.getElementById("myRange");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value; // Display the default slider value

	function save_data() {
		var input = document.getElementById("myRange");
		sessionStorage.setItem("server", input.value);
	}

	function load_data() {
     var input = document.getElementById("myRange");
     if(sessionStorage.getItem("server") == null){
         input.value = 10.0;
     } else {
         input.value = sessionStorage.getItem("server");
     }
     document.getElementById("demo").innerHTML = slider.value;

     return input.value;
 }

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
	  output.innerHTML = this.value;
	  save_data();
	}		
	
	var shown_radius = load_data();

	const array_name = []
	const descripts = []

	$.ajax({
		url: "get.php",
		type: "GET",
		success: function(data) {
			var n = jQuery.parseJSON(data).length;
			var parsed = jQuery.parseJSON(data);
			
			
			for (let i = 0; i < n; i++) {
				
				if(arePointsNear({lat: parsed[i]["latitude"], lng: parsed[i]["longitude"]}, {lat: position.coords.latitude, lng: position.coords.longitude}, shown_radius, parsed[i]["description"])) {
					array_name.push( [parsed[i]["longitude"], parsed[i]["latitude"]] )
					descripts.push(parsed[i]["description"])
				
					var popup = new mapboxgl.Popup()
					  .setText(parsed[i]["description"])
					  .addTo(map);
					
					if(parsed[i]["flag"] == "0") {

						const marker = new mapboxgl.Marker({
						draggable: false,
						})
						.setLngLat([parsed[i]["longitude"], parsed[i]["latitude"]])
						.addTo(map)
						.setPopup(popup);

					}


					/*eventbrite or other non-beekin event markers*/
					if(parsed[i]["flag"] == "1") {

						const marker = new mapboxgl.Marker({
						draggable: false,
						color: "#D178D9"
						})
						.setLngLat([parsed[i]["longitude"], parsed[i]["latitude"]])
						.addTo(map)
						.setPopup(popup);

					}
					
					marker.getElement().addEventListener('click', () => { 
						document.getElementById("beekin-title").innerHTML = parsed[i]["description"];
						document.getElementById("reverse-geocode").innerHTML = parsed[i]["rgeocoding"];
						document.getElementById("timestamp").innerHTML = parsed[i]["timestamp"];
						document.getElementById("beekin-longitude").innerHTML = parsed[i]["longitude"];
						document.getElementById("beekin-latitude").innerHTML = parsed[i]["latitude"];
						$("#click_modal").modal('show');
					});
				}
			}
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

	var createGeoJSONCircle = function(center, radiusInM, points) {
		if(!points) points = 64;

		var coords = {
			latitude: center[1],
			longitude: center[0]
		};

		var km = radiusInM/0.621371;

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
	map.on('style.load', function() {
    map.addSource("polygon", createGeoJSONCircle([position.coords.longitude, position.coords.latitude], shown_radius));
	
	map.addLayer({
	"id": "polygon",
	"type": "fill",
	"source": "polygon",
	"layout": {"visibility" : "visible"},
	"paint": {
		"fill-color": "blue",
		"fill-opacity": 0.1
	}
	});
	
	});
	
	function drop_beekin_modal() {
		document.getElementById("drop-beekin-description").addEventListener("click", drop_beekin);
		$("#drop_beekin_modal").modal('show');
	}

	function drop_beekin_intermediate() {
		drop_beekin();
	}

	function drop_beekin() {
		const lngLat = marker.getLngLat();
		//console.log([lngLat.lng, lngLat.lat])
		
		//var description = prompt("Event description: ")

		var description = document.getElementById("beekin-description").value;


// reverse geocoding is done when initially dropping a beekin to prevent repeated calls to api
// commented out for later implementation (maybe)
/*		$.get(
	    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
	      lngLat.lng + "," + lngLat.lat + ".json?access_token=" + mapboxgl.accessToken,
	    function(data) {
	      //console.log(data.features[0]["place_name"]);
	      //alert(data.features[0]["place_name"]);
	      //console.log(data)

				$.ajax({
					url: "save.php",
					type: "POST",
					data: {
						description: description,
						longitude: lngLat.lng,
						latitude: lngLat.lat,
						geocode: data.features[0]["place_name"]
					},
					success: function(response) { console.log("success") },
					cache: false
				});
	    });
*/		

		if(description.length > 0) {

			$.ajax({
				url: "save.php",
				type: "POST",
				data: {
					description: description,
					longitude: lngLat.lng,
					latitude: lngLat.lat,
					geocode: "reverse_geocode_placeholder", //data.features[0]["place_name"]
					flag: 0
				},
				success: function(response) { location.reload() },
				cache: false
			});

		}

		else{
			alert("Beekin description must be greater than 0 characters!")
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
			
			link.onclick = function() {drop_beekin_modal()};
			
			const layers = document.getElementById('drop-beekin');
			layers.appendChild(link);
		
	}});

	map.on('idle', () => {
		const layerList = document.getElementById('theme_select');
		const inputs = layerList.getElementsByTagName('input');
		
		for (const input of inputs) {
			input.onclick = (layer) => {
				const layerId = layer.target.id;
				
				if(layerId == "streets-v11") {
					sessionStorage.setItem("theme", 1);
				}

				if(layerId == "light-v10") {
					sessionStorage.setItem("theme", 2);
				}

				if(layerId == "dark-v10") {
					sessionStorage.setItem("theme", 3);
				}
				
				map.setStyle('mapbox://styles/mapbox/' + layerId);
			};
		}
		
	});
}

// write error location function after finalizing successlocation
function errorLocation() {

}