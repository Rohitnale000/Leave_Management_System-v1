<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { storeData } from "../store/store";
    import ApplyForLeave from "../controllers/employee"
    const LeaveClassObj = new ApplyForLeave()
    let loginUserObject={}
    let result=""
    storeData.subscribe(value=>{
    loginUserObject = value
  })
 
  onMount(async()=>{
     result = await LeaveClassObj.sendLoginId(loginUserObject.data.emp_id)
    result=result.data;
  })


</script>
 

 <div class="container-xl">
    <div class="table-responsive">
        <div class="table-wrapper">
            <div class="table-title mt-3">
                <div class="row">
                    <div class="col-sm-8 mb-4" style="color:green"><h2>Leave <b>Status</b></h2></div>
                    <div class="col-sm-4">
                        <div class="search-box">
                           <button class="btn btn-primary" on:click={()=>{navigate("/employee-dashboard")}}>Back To Home</button>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>From Date </th>
                        <th>To Date</th>
                        <th>Type of Leave </th>
                        <th>Reason</th>
                        <th>Status </th>
                    </tr>
                </thead>
                <tbody>
                   {#each result as ls,i}
                    
                  <tr>
                        <td>{i+1}</td>
                        <td>{ls.from_date}</td>
                        <td>{ls.to_date}</td>
                        <td>{ls.type_of_leave}</td>
                        <td>{ls.reason}</td>
                        <td>{ls.leave_status}</td>
                 
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
