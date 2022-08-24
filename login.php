<?php
  session_start();
  // connect to db
  $conn = mysqli_connect("localhost", "walie", "test1234", "beeksin_test1");
  
  // check connection
  if(!$conn){
    echo "Connection error: " . mysqli_connect_error();
  }

  if(isset($_POST["beekin-login-username"])) {
    if(isset($_POST["beekin-login-password"])) {
      $uname = $_POST["beekin-login-username"];
      $password = $_POST["beekin-login-password"];

      $sql="SELECT * FROM logins WHERE user='".$uname."'AND pass='".$password."' limit 1";

      $result=mysqli_query($conn,$sql);

      if(mysqli_num_rows($result)==1){
        $cookie_name = "beekins-user-logged-in";
        $cookie_value = $uname;
        setcookie($cookie_name, $cookie_value, time() + (86400 * 1), "/"); // 86400 = 1 day
        header("Location: map.php");
        exit();
      }
      else {
        echo "You have entered incorrect password";
        exit();
      }



    }
  }

?>