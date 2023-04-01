<script>
    import { storeData } from "../store/store";
  import Sidebar from "../components/shared/sidebar.svelte";
  import Navigation from "../components/shared/navigation.svelte";
    // import CreateEmployee from "../components/create-employee.svelte";
    let managerInformation;
    storeData.subscribe(value=>{
        managerInformation = value;
        console.log(managerInformation);
    });
   
</script>

<main>
    <Navigation/>
    <!-- <Sidebar/> -->
    <h1>{managerInformation.data.first_name}</h1>
    
</main>