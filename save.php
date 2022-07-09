<?php
	include 'database.php';
	$description=$_POST['description'];
	$longitude=$_POST['longitude'];
	$latitude=$_POST['latitude'];
	$sql = "INSERT INTO locations(description, longitude, latitude) VALUES ('$description', '$longitude', '$latitude')";
	$create_post_query = mysqli_query($conn, $sql);
	mysqli_close($conn);
?>