    <script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";    
    import { storeData } from "../store/store";
    import ApplyForLeave from "../controllers/employee"
   
    const LeaveClassObj = new ApplyForLeave()
   // let loginUserObject={}
    let result=""
//     storeData.subscribe(value=>{
//     loginUserObject = value
//   })
let loginUserObject= JSON.parse(sessionStorage.getItem('data'));
  onMount(async()=>{
     result = await LeaveClassObj.sendLoginId(loginUserObject.emp_id)
    result=result.data;
    console.log(result.length);
  })

 

</script>
 

 <div class="container-fluid mt-5">
    <div class="table-responsive">
        <div class="table-wrapper">
            <div class="table-title mt-5">
                <div class="row">
                    <div class="col-sm-8 mb-4" style="color:green"><h2>Leave <b>Status</b></h2></div>
                    <div class="col-sm-4">
                        <div class="search-box">
                           <!-- <button class="btn btn-primary" on:click={()=>{navigate("/employee-dashboard")}}>Back To Home</button> -->
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Sr.No</th>
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
            <div class="col-sm-4">
                <div class="search-box">
                   <button class="btn btn-primary" on:click={()=>{navigate("/employee-dashboard")}}>Back To Home</button>
                </div>
            </div>
        </div>
    </div>
</div>
