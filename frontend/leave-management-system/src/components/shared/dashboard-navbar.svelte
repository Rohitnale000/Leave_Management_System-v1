<script>
  import { navigate } from "svelte-routing";
</script>
<main>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg fixed-top px-0"style="background-color: #4BAA67;">
    <!-- Container wrapper -->
    <div class="container-fluid justify-content-space-around">
      <div class="container-fluid mt-2">
        <!-- <div class="navbar-header"> -->
          <a class="navbar-brand" href="#" style="color:aliceblue "><h3 class="heading"><b>Leave</b> Management System</h3></a>
        </div>
      </div>
      <!-- </span> -->
      <div class="d-flex">
        <button class="logout-button" on:click={()=>{
          navigate("/");
        }}>Logout</button>
      </div>
  </nav>
</main>
<style>
  .icon-size{
    font-size: 30px;
  }
  nav{
    margin-bottom: 10px;
    background-color:#0d6efd;
  }
  .logout-button{
    background-color: transparent;
    border-radius: 5px;
    color: #FFFFFF;
    padding:5px;
  }
  .logout-button {
   background-color:#2bac08;
  }
  .heading{
    text-decoration: none;
  }
</style>







