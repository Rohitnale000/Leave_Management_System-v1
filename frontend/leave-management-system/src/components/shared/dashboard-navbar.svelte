<script>
    import Icon from "@iconify/svelte";
  </script>
  <main>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top px-0"style="background-color: #4BAA67;">
      <!-- Container wrapper -->
      <div class="container-fluid justify-content-space-around">
        <span class="d-none d-xl-inline-block snippet-title-span">
          <u>
            <a class="snippet-title-link" style="color:aliceblue "><h3>Leave Management System</h3></a>
          </u>
        </span>
        <div class="d-flex">
          <button class="logout-button">Logout</button>
        </div>
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
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
      border-radius: 3px;
      color: black;
    }
  </style>