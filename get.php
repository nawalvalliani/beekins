<?php
	include 'database.php';
	$sql = "SELECT * FROM locations ORDER BY id DESC";
	$exec = mysqli_query($conn, $sql);
	
	$row = mysqli_fetch_all($exec, MYSQLI_ASSOC);
	
	echo json_encode($row);

	mysqli_close($conn);
?>