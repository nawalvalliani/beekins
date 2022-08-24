<?php
	include 'database.php';
	$description=$_POST['description'];
	$longitude=$_POST['longitude'];
	$latitude=$_POST['latitude'];
	$geocode=$_POST['geocode'];
	$user=$_POST['user'];
	$sql = "INSERT INTO locations(description, longitude, latitude, rgeocoding, user) VALUES ('$description', '$longitude', '$latitude', '$geocode', '$user')";
	$create_post_query = mysqli_query($conn, $sql);
	mysqli_close($conn);
?>