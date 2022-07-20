<?php
	include 'database.php';
	$description=$_POST['description'];
	$longitude=$_POST['longitude'];
	$latitude=$_POST['latitude'];
	$geocode=$_POST['geocode'];
	$flag=$_POST['flag'];
	$sql = "INSERT INTO locations(description, longitude, latitude, rgeocoding, flag) VALUES ('$description', '$longitude', '$latitude', '$geocode', '$flag')";
	$create_post_query = mysqli_query($conn, $sql);
	mysqli_close($conn);
?>