<?php

  // connect to db
  $conn = mysqli_connect("localhost", "walie", "test1234", "beeksin_test1");
  
  // check connection
  if(!$conn){
    echo "Connection error: " . mysqli_connect_error();
  }

  if(isset($_POST["beekin-username"])) {
    if(isset($_POST["beekin-password"])) {
      $uname = $_POST["beekin-username"];
      $password = $_POST["beekin-password"];

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

<link href="video_style.css" rel="stylesheet">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

<video id="background-video" autoplay loop muted poster="https://assets.codepen.io/6093409/river.jpg">
  <source src="hand.mp4" type="video/mp4">
</video>

<script>
    $(document).ready(function() {
        $("#login_modal").modal('show');
    });
</script>


<div id="login_modal" class="modal fade" data-backdrop="static">
    <form action="#" method="POST">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Welcome to Beekins! &#128029;</h5>
                <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
            </div>
            <div class="modal-body">
              <p>Beekins is a real-time events tracker to connect you to what is happening in your community. Login or Register to check out where the buzz is!</p>
              <input type="text" id="beekin-username" name="beekin-username" class="form-control input-lg" placeholder="Username">
              <p style="padding:0px"></p>
              <input type="password" id="beekin-password" name="beekin-password" class="form-control input-lg" placeholder="Password">              
              <p style="padding:1px"></p>
        <button id="login" type="button" class="btn btn-primary" data-dismiss="modal">Login</button>
        <button id="register" type="button" class="btn btn-primary" data-dismiss="modal">Register</button>
            </div>
        </div>
    </div>
    </form>
</div>

</html>