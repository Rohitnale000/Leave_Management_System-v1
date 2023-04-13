<script>
import ApplyForLeave from "../controllers/employee"
import { onMount } from 'svelte'
const LeaveClassObj = new ApplyForLeave()

let loginUserObject= JSON.parse(sessionStorage.getItem('data'));
  let status=""
  let casualLeave='';
  let sickLeave='';
  let paidLeave ='';
  let totalLeave=''

  onMount(async()=>{
   let result = await LeaveClassObj.setLoginId(loginUserObject.emp_id)
   casualLeave=result.data.casual_leave
   sickLeave=result.data.sick_leave
   paidLeave=result.data.paid_leave
    totalLeave=result.data.total_leave;
    status=result.statusCode
  })
</script>
{#if status===200}
<div class="container-fluid mt-5 mb-3 ">
    <div class="row">
        <div class="col-md-2">
            <div class="card p-3 mb-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="icon"> <i class="bx bxl-mailchimp"></i> </div>
                        <div class="ms-2 c-details">
                            <h6 class="mb-0">Paid Leaves</h6> 
                        </div>
                    </div>
                    
                </div>
                <div class="mt-5">
                    <h1 class="heading">{paidLeave}<br></h1>
                    <div class="mt-5">
                        <div class="progress">
                            <!-- <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="card p-3 mb-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="icon"> <i class="bx bxl-mailchimp"></i> </div>
                        <div class="ms-2 c-details">
                            <h6 class="mb-0">Sick Leaves</h6> 
                        </div>
                    </div>
                    
                </div>
                <div class="mt-5">
                    <h1 class="heading">{sickLeave}<br></h1>
                    <div class="mt-5">
                        <div class="progress">
                            <!-- <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="card p-3 mb-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="icon"> <i class="bx bxl-mailchimp"></i> </div>
                        <div class="ms-2 c-details">
                            <h6 class="mb-0">Casual Leaves</h6> 
                        </div>
                    </div>
                    
                </div>
                <div class="mt-5">
                    <h1 class="heading">{casualLeave}<br></h1>
                    <div class="mt-5">
                        <div class="progress">
                            <!-- <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="card p-3 mb-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="icon"> <i class="bx bxl-mailchimp"></i> </div>
                        <div class="ms-2 c-details">
                            <h6 class="mb-0">Total Leaves</h6> 
                        </div>
                    </div>
                    
                </div>
                <div class="mt-5">
                    <h1 class="heading">{totalLeave}<br></h1>
                    <div class="mt-5">
                        <div class="progress">
                            <!-- <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>    
{/if}
<style>
    body {
    background-color: #eee
}

.card {
    border: none;
    border-radius: 10px;
    background-color: #fed85d;
}

.c-details span {
    font-weight: 300;
    font-size: 13px
}

.icon {
    width: 50px;
    height: 50px;
    background-color: #eee;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 39px
}

.badge span {
    background-color: #fffbec;
    width: 60px;
    height: 25px;
    padding-bottom: 3px;
    border-radius: 5px;
    display: flex;
    color: #fed85d;
    justify-content: center;
    align-items: center
}



.text1 {
    font-size: 14px;
    font-weight: 600
}

.text2 {
    color: #a5aec0
}
.row{
    
    justify-content: space-around;
    align-items: center;
    margin-left: 20%;
    margin-top: 200px;
    height: 40vh;
}
</style>