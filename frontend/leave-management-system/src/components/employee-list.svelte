<script>
import { onMount } from "svelte";
import ApplyForLeave from "../controllers/employee"
import { paginate, LightPaginationNav} from 'svelte-paginate'
import DashboardNavbar from "./shared/dashboard-navbar.svelte";
import toast, { Toaster } from "svelte-french-toast";
import { dialogs } from "svelte-dialogs";
import { navigate } from "svelte-routing";

const LeaveClassObj = new ApplyForLeave()
let loginUserObject= JSON.parse(sessionStorage.getItem('data'));
let items=[];
let currentPage = 1
let pageSize = 2
let flag= false;
let searchInput="";

$: paginatedItems = paginate({ items, pageSize, currentPage })

try {
  onMount(async()=>{
   const result = await LeaveClassObj.getEmployeeList(loginUserObject.email_id)
   if(result.statusCode===200){

    items =await result.data;
   }else{
      flag=true
   } 
  }) 
} catch (error) {
  console.log(error);
}


const handleDelete= async(data)=>{
  let output = await dialogs.prompt({ label: "Enter reason for delete this record", type: "text",required: true});
  if(output===null){
    return
  }

  const result1 = await LeaveClassObj.deleteEmployee(data.emp_id,output[0])
  if(result1.statusCode===200){
    toast.success(result1.message)
    const result = await LeaveClassObj.getEmployeeList(loginUserObject.email_id)
    if(result.statusCode===200){
      items = (result.data); 
    }
    else if(result.statusCode===404){
      flag=true
    }
  }else if(result1.statusCode==404){
    flag=true
  }
}


const handleSearch =async(e)=>{
  if(e.key==='Enter'){
    if(searchInput.trim().length===0){
      flag=true;
      return
    }
    
  const result = await LeaveClassObj.searchEmployee(searchInput,loginUserObject.email_id);
  if(result.statusCode===302){
      items = (result.data); 
    }
    else if(result.statusCode===404){
      flag=true
    }
  }
}

const handleUpdate=async(data)=>{
  navigate(`/update-employee/${data.emp_id}`)
}
</script> 
<Toaster />
<DashboardNavbar/>
<main>
            {#if flag===false}
            <div class="container-fluid mt-3 pt-5 ">
              <div class="form-outline mb-2">
                <input type="search" id="form1" class="form-control" placeholder="Search + Enter" aria-label="Search" bind:value={searchInput} on:keypress={handleSearch} autocomplete="off"/>
              </div>

              <table class="table table-striped table-hover table-bordered  table-responsive ">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Contact No  </th>
                          <th>Department</th>
                          <th>Designation</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                    {#each paginatedItems as i}
                    <tr>
                      <td>{i.first_name +" "+ i.last_name}</td>
                      <td>{i.contact_no}</td>
                      <td>{i.department}</td>
                      <td>{i.designation}</td>
                      <td>{i.email_id}</td>
                      <td>{i.emp_role}</td>
                      <td >
                          <span>
                            <button class="btn btn-success me-2" type="button" on:click={handleUpdate(i)}>Update</button>
                            <button class="btn btn-danger" type="button" on:click={handleDelete(i)}>Delete</button>
                          </span>
                      </td>
                  </tr> 
                    {/each}
                  </tbody>
              </table> 
              <div class="ml-3 col-md-3 mb-3 w-100 d-flex justify-content-between">
                <LightPaginationNav 
                totalItems="{items.length}"
                pageSize="{pageSize}"
                currentPage="{currentPage}"
                limit="{1}"
                showStepOptions="{true}"
                on:setPage="{(e) => currentPage = e.detail.page}"
              /> 
              <button class="btn btn-dark" type="button" on:click={()=>{navigate('/manager-dashboard')}}>Back</button>
            </div>
            </div>           
            {:else}
               <h1>There is no records available</h1>
            {/if}
          
</main>

<style>
  h1{
    margin-top: 10%;
    text-align: center;
  }
  .form-outline{
    border-radius:3px;
    border: 1px solid #0d6efd
  } 
</style>