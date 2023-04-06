<script>
  import Icon from "@iconify/svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { navigate } from "svelte-routing";
  import { storeData } from "../store/store";
  //import class from controller
  import ApplyForLeave from "../controllers/employee"
  //create object of that class
  let errors = {leavetypeError:'',daytypeError:'',fromdateError:'',todateError:'',dayError:''}
  let valid = false

  const LeaveClassObj = new ApplyForLeave()

  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate());
  let minDate = yesterday.toISOString().split("T")[0]; 
  console.log(minDate);
 
  // let loginUserObject={}
  // storeData.subscribe(value=>{
  //   loginUserObject = value
  // })
  let loginUserObject= JSON.parse(sessionStorage.getItem('data'));
  const formFields={
    typeOfLeave:"",
    typeOfDay:"",
    fromDate:"",
    toDate:"",
    reason:"",
    empId:loginUserObject.emp_id,
    reportingManagerEmail:loginUserObject.reporting_manager_email
  }

  const handleSubmit =async ()=>{
   valid=true;
   if ((formFields.typeOfLeave)== "") {
      valid = false;
      errors.leavetypeError = "Please select leave type";
    } else {
      errors.leavetypeError = "";
    }
    if ((formFields.typeOfDay)== "") {
      valid = false;
      errors.daytypeError = "Please select (full/half) day";
    } else {
      errors.daytypeError = "";
    }
    if ((formFields.fromDate).length ===0) {
      valid = false;
      errors.fromdateError = "please select valid date";
    } else {
      errors.fromdateError = "";
    }
    if ((formFields.toDate).length ===0) {
      valid = false;
      errors.todateError = "please select valid date";
    } else {
      errors.todateError = "";
    }if((formFields.typeOfDay==='Half Day')){
        if(formFields.fromDate !== formFields.toDate){
          valid = false;
          errors.dayError = "You are choose Half Day and does not select valid date(Same Date)";
        }
        else{
             errors.dayError = "";
        }
    }else{
      errors.dayError = "";
    }
   //using class object call methods from that class
   //also send data that you want to send to class
   if(valid){
    let result = await LeaveClassObj.getFormData(formFields)
    if(result.statusCode===201){
        toast.success("You have successfully applied for leave")
        navigate("/leave-application")
    }else if(result.statusCode===404){
        toast.error(result.message)
        navigate("/leave-application")
    }
   }
  }


</script>
<Toaster />

<!-- <div class="heading_box"><h5>Apply Leave <span><Icon icon="iconoir:help-circle" /></span></h5></div> -->
<main class="box">

    <div class="container-fluid  "><br>
      <!-- <marquee class="blink">If You are apply for Half Day Please Select <b>Same Date</b></marquee> -->
        <form class="row g-4">
            <div class="form-icon"/>
            <!--Firstname Input-->
            <div class="col-md-3">
                <label for="leave_type" class="form-label">Type of Leave <span class="star">*</span></label>
                <select
                type="text"
                class="form-control item"
                id="leave_type"
                bind:value={formFields.typeOfLeave}
                placeholder="Gender"
                ><option value="" disabled selected>-Select-</option>
                <option value="Paid Leave">Privilege Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
            </select>
            <span class="error">{errors.leavetypeError}</span>
            </div>
            <div class="col-md-3">
                <label for="half Day" class="form-label">Type of Day <span class="star">*</span></label>
                <select
                type="text"
                class="form-control item"
                id="half Day"
                bind:value={formFields.typeOfDay}
                placeholder="Type of Day"
                ><option value="" disabled selected>-Select-</option>
                <option value="Full Day">Full Day</option>
                <option value="Half Day">Half Day</option>
            </select>
            <span class="error">{errors.daytypeError}</span>
            </div>
            <div class="col-md-3">
                <label for="From date" class="form-label">From Date <span class="star">*</span></label>
                <input
                    title="From Date"
                    type="date"
                    class="form-control item"
                    id="From Date"
                    bind:value={formFields.fromDate}
                    placeholder="From Date"
                    min={minDate}
                />
                <div class="error">{errors.fromdateError}</div>
            </div>
            <div class="col-md-3">
                <label for="To date" class="form-label">To Date <span class="star">*</span></label>
                <input
                    title="To Date"
                    type="date"
                    class="form-control item"
                    id="To Date"
                    min={minDate}
                    bind:value={formFields.toDate}
                    placeholder="To Date"
                />
                <span class="error">{errors.todateError}</span>
            </div>
            
            <!-- <div class="col-md-3">
                <label for="No of leaves" class="form-label">No of Leaves <span class="star">*</span></label>
                <input
                title="No of leaves"
                type="text"
                class="form-control item"
                id="No of leaves"
                placeholder="0"
            />
            </div> -->
            <div class="col-md-4">
                <label for="Approver" class="form-label">Approver <span class="star">*</span></label>
                <input
                title="Approver"
                type="text"
                class="form-control item"
                id="Approver"
                bind:value={formFields.reportingManagerEmail}
                placeholder="Approver"
                disabled
            />
            </div>
            <div class="col-md-3">
              <span class="error">{errors.dayError}</span>
            </div>
            <div class="form-group">
                <label for="Reason for leave" class="form-label">Reason For leave</label>
                <textarea class="form-control" id="Reason for leave" bind:value={formFields.reason} rows="2" col="4" maxlength="250"  ></textarea>
            </div>
        </form>
        <div class="text-center">
            <button class="btn btn-success col-sm-1 mt-4"on:click|preventDefault={handleSubmit}>Apply</button>
            <button class="btn btn-dark col-sm-1 mt-4" on:click={()=>{navigate("/employee-dashboard")}} >Cancel</button>
        </div>  

    </div>


</main>


<style>
body{
    box-sizing: border-box;
}
.form-label {
    font-weight: 500;
}
.star{
    color:red;
}
.box{
    display: flex;
	-ms-flex: 1;
	background: whitesmoke;
    margin: 40px;
    margin-top:180px;
    height: 80vh;
}
.heading_box{
    display: flex;
    align-items:center;
    justify-content: flex-start;
    margin-top:90px;
    height: 50px;
    padding-bottom:20px;
    padding-top: 20px;
    padding-left: 30px;
    margin-left: 40px;
    margin-right: 40px;
    background-color: #4baa67;
    color: white;
    font-weight: 800;
    border-radius:2px;    
}
.container-lg{
    margin-top: 120px;
}
.error{
    color:red;
    margin-top:0px;
    font-size: smaller;
  }
  .blink{
    color: red;
  }
</style>