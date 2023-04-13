<script>
	import SidebarManager from './../components/shared/sidebar-manager.svelte';
    import DashboardNavbar from "../components/shared/dashboard-navbar.svelte";

    let loginUserObject= JSON.parse(sessionStorage.getItem('data'));
  
</script>
<main>
    <DashboardNavbar/>
    <SidebarManager/>
    
</main>
<style>
   
</style>