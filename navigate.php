<!DOCTYPE html>
<html lang="en">

<link rel="shortcut icon" type="image/x-icon" href="icon.png"/>

<head>
	<meta charset="UTF-8">
	<meta name="viewport"
	content="width=device-width", initial-scale="1.0">
	<meta http-equiv="X-UA-Compatible"
	content="ie=edge">
	
	<script src='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.js'></script>
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
	
	<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js"></script>
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css" type="text/css">

	<title>Beekins Navigator</title>
	
	<?php
		$vals = explode(',', $_GET['q']);
		echo "<span hidden id='passed-longitude'>{$vals[0]}</span>";
		echo "<span hidden id='passed-latitude'>{$vals[1]}</span>";
	?>



	
	<style>
		body {
			margin: 0;
		}
		
		#map {
			height: 100vh;
			width: 100vw;
		}
	</style>
	<script src="navigate.js" defer></script>
</head>
<body>
	<div id='map'></div>
</body>
</html>