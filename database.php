<?php

	// connect to db
	$conn = mysqli_connect("localhost", "walie", "test1234", "beeksin_test1");
	
	// check connection
	if(!$conn){
		echo "Connection error: " . mysqli_connect_error();
	}

?>