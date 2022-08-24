<?php
session_start();

// initializing variables
$username = "";
$email    = "";
$errors = array(); 

// connect to the database
$conn = mysqli_connect("localhost", "walie", "test1234", "beeksin_test1");

// REGISTER USER
if (isset($_POST['beekin-reg-username'])) {
  // receive all input values from the form
  $username = mysqli_real_escape_string($conn, $_POST['beekin-reg-username']);
  $email = mysqli_real_escape_string($conn, $_POST['beekin-reg-email']);
  $password = mysqli_real_escape_string($conn, $_POST['beekin-reg-password']);
  $password_2 = mysqli_real_escape_string($conn, $_POST['beekin-reg-password-confirm']);

  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($username)) { array_push($errors, "Username is required"); }
  if (empty($email)) { array_push($errors, "Email is required"); }
  if (empty($password)) { array_push($errors, "Password is required"); }
  if ($password != $password_2) {
	array_push($errors, "The two passwords do not match");
  echo "<h1>The two passwords do not match.</h1>";
  }

  // first check the database to make sure 
  // a user does not already exist with the same username and/or email
  $user_check_query = "SELECT * FROM logins WHERE user='$username' OR email='$email' LIMIT 1";
  $result = mysqli_query($conn, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['user'] === $username) {
      array_push($errors, "Username already exists");
      echo "<h1>Username already exists.</h1>";
    }

    if ($user['email'] === $email) {
      array_push($errors, "Email already exists");
      echo "<h1>Email address already exists.</h1>";
    }
  }

  // Finally, register user if there are no errors in the form
  if (count($errors) == 0) {
  	//$password = md5($password);//encrypt the password before saving in the database

  	$query = "INSERT INTO logins (user, email, pass) 
  			  VALUES('$username', '$email', '$password')";
  	mysqli_query($conn, $query);
  	$_SESSION['username'] = $username;
  	$_SESSION['success'] = "You are now logged in";

    $cookie_name = "beekins-user-logged-in";
    $cookie_value = $uname;
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day


  	header('location: map.php');
  }
}