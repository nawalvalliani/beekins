
<?php

  // connect to db
  $conn = mysqli_connect("localhost", "walie", "test1234", "beeksin_test1");
  
  // check connection
  if(!$conn){
    echo "Connection error: " . mysqli_connect_error();
  }

  if(isset($_POST["uname"])) {
    if(isset($_POST["psw"])) {
      $uname = $_POST["uname"];
      $password = $_POST["psw"];

      $sql="SELECT * FROM logins WHERE user='".$uname."'AND pass='".$password."' limit 1";

      $result=mysqli_query($conn,$sql);

      if(mysqli_num_rows($result)==1){
        header("Location: index.php");
        exit();
      }
      else {
        echo "You have entered incorrect password";
        exit();
      }



    }
  }

?>

<!DOCTYPE html>
<html>

<form action="#" method="POST">

  <div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>

    <button type="submit">Login</button>
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
  </div>

  <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="cancelbtn">Cancel</button>
    <span class="psw">Forgot <a href="#">password?</a></span>
  </div>
</form>

</html>