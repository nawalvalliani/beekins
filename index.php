<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Beekins - PHP</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


<link href="drop_beekin_button_styles.css" rel="stylesheet">
<link href="nav_button_styles.css" rel="stylesheet">
<link href="button_style.css" rel="stylesheet">
<link href="toggle_styles.css" rel="stylesheet">
<link href="slider_style.css" rel="stylesheet">
<link href="logo_container_style.css" rel="stylesheet">
<script src="mapbox_scripts.js"></script>

<link rel="icon" href="icon.png">


<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
<!--<script src="jquery.cookie.js"></script> https://github.com/carhartl/jquery-cookie -->
<script src="jquery.cookie.js"></script>
<script>

	/*
	<!-- stores cookie. if cookie is stored, do not display modal. show modal if no cookie. SO: https://stackoverflow.com/questions/13352658/reveal-modal-with-cookie-to-display-only-once -->
	$(document).ready(function() {
    if ($.cookie('beekins_modal_shown') == null) {
        $.cookie('beekins_modal_shown', 'yes', { expires: 1, path: '/' });
        $("#myModal").modal('show');
    }
});
	*/
	
</script>

<style>

</style>

</head>
<body>
 
<nav id="drop-beekin"></nav>
<nav id="nav-button"></nav>
<div id="map"></div>
<!--<div id="logoContainer">
	<img src="icon.png">
</div>-->

<pre id="coordinates" class="coordinates"></pre>


<div id="myModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Welcome to Beekins! &#128029;</h5>
                <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
            </div>
            <div class="modal-body">
				<p>Beekins is a real-time events tracker to connect you to what is happening in your community. Check out where the buzz is!</p>
				<!--<button type="submit" class="button" data-dismiss="modal">Continue</button> use this with button_style.css -->
				<button type="submit" class="btn btn-primary" data-dismiss="modal">Continue</button>
                <!--<form>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Email Address">
                    </div>
                    <button type="submit" class="btn btn-primary">Subscribe</button>
                </form>-->
            </div>
        </div>
    </div>
</div>

<div id="theme_select">
	<!-- See a list of Mapbox-hosted public styles at -->
	<!-- https://docs.mapbox.com/api/maps/styles/#mapbox-styles -->
	<!--<input id="satellite-v9" type="radio" name="rtoggle" value="satellite" checked="checked">
	<label for="satellite-v9">satellite</label>
	<input id="light-v10" type="radio" name="rtoggle" value="light">
	<label for="light-v10">light</label>
	<input id="dark-v10" type="radio" name="rtoggle" value="dark">
	<label for="dark-v10">dark</label>
	<input id="streets-v11" type="radio" name="rtoggle" value="streets">
	<label for="streets-v11">streets</label>
	<input id="outdoors-v11" type="radio" name="rtoggle" value="outdoors">
	<label for="outdoors-v11">outdoors</label>-->
	
	<input id="streets-v11" type="radio" name="rtoggle" value="streets" checked="checked">
	<label for="streets-v11">streets</label>
	
	<input id="light-v10" type="radio" name="rtoggle" value="light">
	<label for="light-v10">light</label>
	
	<input id="dark-v10" type="radio" name="rtoggle" value="dark">
	<label for="dark-v10">dark</label>	
	
	
</div>

<!--<div class="map-overlay top">
	<div class="map-overlay-inner">
		<h2>Significant earthquakes in 2015</h2>
		<label id="month"></label>
		<input id="slider" type="range" min="0" max="11" step="1" value="0">
	</div>

	<div class="map-overlay-inner">
		<div id="legend" class="legend">
			<div class="bar"></div>
			<div>Magnitude (m)</div>
		</div>
	</div>
</div>-->
 
</body>
</html>