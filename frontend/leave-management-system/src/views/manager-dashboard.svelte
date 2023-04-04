<script>
	import SidebarManager from './../components/shared/sidebar-manager.svelte';
    import { storeData } from "../store/store";
    // import Sidebar from "../components/shared/sidebar-manager.svelte";
    import DashboardNavbar from "../components/shared/dashboard-navbar.svelte";
    let managerInformation;
    storeData.subscribe(value=>{
        managerInformation = value;
    });
    console.log(managerInformation,"hello from store");
</script>
<main>
    <DashboardNavbar/>
    <SidebarManager/>
    <!-- <h1>{managerInformation.data.first_name}</h1> -->
        <div class="container-xl" style="margin-top: 50px;">
            <div class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title mt-3">
                    <div class="d-inline-flex">
                        <!-- <label class="label" for="name" value="name">Name :</label>
                        <div class="display-info" contenteditable="true" bind:innerHTML={managerInformation.data.first_name}></div>
                        <label for="name" value="name">Designation :</label>
                        <div class="display-info" contenteditable="true" bind:innerHTML={managerInformation.data.designation}></div>
                        <label for="name" value="name">Department :</label>
                        <div class="display-info" contenteditable="true" bind:innerHTML={managerInformation.data.department}></div>
                        <label for="name" value="name">Role :</label>
                        <div class="display-info" contenteditable="true" bind:innerHTML={managerInformation.data.emp_role}></div> -->
                    </div>
                    </div>
                </div>
            </div>
        </div>
</main>
<style>
    .display-info{
        box-sizing: border-box;
        font-weight: 500;
        font-size: medium;
        margin-left:80%;
        border:2px solid black;
        background-color: whitesmoke;
    }
    .d-inline-flex{
     vertical-align: -webkit-baseline-middle;
    }
    .label{
        font-size: medium;
        font-weight: 500;
    }
</style>