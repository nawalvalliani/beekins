<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Beekins &#128029;</title>
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
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">


<link rel="icon" href="icon.png">

<script src="mapbox_scripts.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
<script src="jquery.cookie.js"></script> <!--https://github.com/carhartl/jquery-cookie-->
<script>
	/* stores cookie. if cookie is stored, do not display modal. show modal if no cookie. SO: https://stackoverflow.com/questions/13352658/reveal-modal-with-cookie-to-display-only-once */

	/*$(document).ready(function() {
    if ($.cookie('beekins_modal_shown') == null) {
        $.cookie('beekins_modal_shown', 'yes', { expires: 1, path: '/' });
        $("#intro_modal").modal('show');
    }

});*/

	/*$(document).ready(function() {
	    if ($.cookie('beekins_modal_shown') == null) {
	        $.cookie('beekins_modal_shown', 'yes', { expires: 1, path: '/' });
	        $("#intro_modal").modal('show');
	    }

	    console.log($.cookie("beekins-user-logged-in"));

});*/
</script>

<style>
</style>

</head>
<body>
 
<nav id="drop-beekin"></nav>
<!--<nav id="nav-button"></nav>-->
<div id="map">
	<div id="logoContainer">
		<img src="icon.png" width="70">
	</div>
</div>

<pre id="coordinates" class="coordinates"></pre>

<div class="map-overlay top">
	<div class="map-overlay-inner" style="filter:alpha(opacity=50); opacity:0.75;">
		<h3>Show Beekins &#128029; Near You</h3>
		<p>Move the slider to show events near you.</p>
		<p>Showing beekins in a <span id="demo"></span> mile radius</p>
		<!--<label id="month"></label>-->
		<input id="myRange" type="range" min="1" max="100" step="1" value="10" onchange="location.reload()">
	</div>
</div>

<div id="intro_modal" class="modal fade">
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
            </div>
        </div>
    </div>
</div>

<div id="click_modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><span id="beekin-title"></span>&#128029;</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            	<p>Address: <span id="reverse-geocode"></span></p>
            	<p>Time: <span id="timestamp"></span></p>
            	<p>Longitude: <span id="beekin-longitude"></span></p>
            	<p>Latitude: <span id="beekin-latitude"></span></p>
				<!--<button type="submit" class="btn btn-primary" data-dismiss="modal">Start Navigation</button>-->
				<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="startNav()">Start Navigation</button>
            </div>
        </div>
    </div>
</div>

<div id="drop_beekin_modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Dropping a Beekin &#128029;</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            	<label for="beekin-description">Beekin description:</label>
            	<input type="text" id="beekin-description" name="beekin-description" class="form-control input-lg" placeholder="Beekins Launch Party!">
            	<small id="small-beekin-description" class="form-text text-muted">Do <strong>not</strong> include personal information in description.</small>
            	<p style="padding:1px"></p>
				<button id="drop-beekin-description" type="button" class="btn btn-primary" data-dismiss="modal">Drop Beekin</button>
            </div>
        </div>
    </div>
</div>

<div id="theme_select">
	<!-- See a list of Mapbox-hosted public styles at -->
	<!-- https://docs.mapbox.com/api/maps/styles/#mapbox-styles -->	
	<input id="streets-v11" type="radio" name="rtoggle" value="streets" checked="checked">
	<label for="streets-v11">streets</label>
	
	<input id="light-v10" type="radio" name="rtoggle" value="light">
	<label for="light-v10">light</label>
	
	<input id="dark-v10" type="radio" name="rtoggle" value="dark">
	<label for="dark-v10">dark</label>	
</div>
 
</body>
</html>