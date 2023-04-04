<script>
  import { navigate } from "svelte-routing";
</script>
<div class="wrapper">
    <nav id="sidebar">
      <div class="sidebar-header">
      </div>
      <ul class="list-unstyled components">
        <!-- Add new Employee -->
        <li class="mt-5">
          <a href="#" on:click={()=>{navigate("/create-employee",{replace:true})}}>Add New Employee</a>
        </li>
        <li>
          <a href="#" on:click={()=>{navigate("/employee-list",{replace:true})}}>Employee List</a>
        </li>
        <li>
          <a href="#">Leave Applications</a>
        </li>
      </ul>
    </nav>
    <!-- <div id="content">
      <h1>My Content</h1>
    </div> -->
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
  margin-top: 120px;
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