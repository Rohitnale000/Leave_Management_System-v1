<script>
	import LeaveApplication from './../leave-application.svelte';
  import { navigate,link } from "svelte-routing";
</script>
<div class="wrapper">
    <nav id="sidebar">
      <div class="sidebar-header">
      </div>
      <ul class="list-unstyled components">
        <br>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">My Account</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="/my-profile" use:link>View Profile</a>
              <a class="dropdown-item" href="/change-password" use:link>Change Password</a>
              <div class="dropdown-divider"></div>
              <!-- <a class="dropdown-item" href="#">Logout</a> -->
      </div>
        </li>
        <li>
          
          <!-- <a href="#">Change Password</a> -->
        </li>
        <li>
          <a href="#" on:click={()=>{
            navigate("/leave-application")
          }}>Leave Application Form</a>
        </li>
        <li>
          <a href="#" on:click={()=>{
            navigate("/leave-status")
          }}>Leave Status</a>
        </li>
        
      </ul>
    </nav>
  </div>

  <style>
    .wrapper {
      display: flex;
      height: 100%;
    }
    #sidebar {
      background:#e9eaee;
      width: 250px;
      height: 100%;
      position: fixed;
      z-index: 1;
      overflow-y: auto;
      transition: all 0.3s;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    #sidebar .sidebar-header {
      text-align: center;
      margin-bottom: 20px;
    }
    #sidebar ul.components {
      padding: 0;
      margin-top: 80px;
    }
    #sidebar ul li {
      list-style: none;
    }
    #sidebar ul li a {
      display: block;
      color: black;
      padding: 10px;
      text-decoration: none;
    }
    #sidebar ul li a:hover {
      background: #E9ECEF;
    }
    #content {
      flex-grow: 1;
      padding: 20px;
    }
    @media (max-width: 768px) {
      #sidebar {
        width: 100%;
        height: auto;
        position: relative;
        padding: 0;
        transition: none;
        box-shadow: none;
      }
      #sidebar ul.components {
        padding: 10px 0;
      }
      #sidebar ul li a {
        padding: 5px;
      }
    }
      </style>