<?php

    if(isset($_COOKIE["beekins-user-logged-in"])){
        header("location: map.php");
    }

?>


<!DOCTYPE html>
<html>
<head>
<title>Beekins &#128029;</title>
<link rel="icon" href="icon.png">
</head>
<link href="video_style.css" rel="stylesheet">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
<link href="logo_container_style.css" rel="stylesheet">

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

<video id="background-video" autoplay loop muted poster="hand.jpg">
  <source src="hand.mp4" type="video/mp4">
</video>

<script>
    $(document).ready(function() {
        $("#login_modal").modal('show');
    });
</script>


<div id="login_modal" class="modal fade" data-backdrop="static">
    
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Welcome to Beekins! &#128029;</h5>
            </div>
            <div class="modal-body">
              <p>Beekins is a real-time events tracker to connect you to what is happening in your community. Login or Register to check out where the buzz is!</p>
   
              <form action="login.php" method="POST">
                <h5 class="modal-title">Login</h5>        
                <p>Already a user? Log in to Beekins here.</p>
                <input type="text" id="beekin-login-usernam" name="beekin-login-username" class="form-control input-lg" placeholder="Username">
                <p style="padding:0px"></p>
                <input type="password" id="beekin-login-password" name="beekin-login-password" class="form-control input-lg" placeholder="Password">              
                <p style="padding:1px"></p>
                <button id="login" type="submit" class="btn btn-primary">Login</button>
              </form>
              
              <p style="padding:0px"></p>

              <form action="register.php" method="POST">
                <h5 class="modal-title">Register</h5>        
                <p>New to Beekins? Register here.</p>
                <input type="text" id="beekin-reg-username" name="beekin-reg-username" class="form-control input-lg" placeholder="Username">
                <p style="padding:0px"></p>
                <input type="text" id="beekin-reg-email" name="beekin-reg-email" class="form-control input-lg" placeholder="E-mail Address">
                <p style="padding:0px"></p>
                <input type="password" id="beekin-reg-password" name="beekin-reg-password" class="form-control input-lg" placeholder="Password">   
                <p style="padding:0px"></p> 
                <input type="password" id="beekin-reg-password-confirm" name="beekin-reg-password-confirm" class="form-control input-lg" placeholder="Re-enter Password">
                <small id="password-requirements" class="form-text text-muted">Password must include at least one lowercase character, one uppercase character, and one number.</small>                
                <p style="padding:1px"></p>
                <button id="register" type="submit" class="btn btn-primary">Register</button>
              </form>
            </div>
        </div>
    </div>
</div>

<div id="logoContainer">
    <img src="icon.png" width="70">
</div>

</html>