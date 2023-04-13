<script>
  import { navigate } from "svelte-routing";
  import DashboardNavbar from "./shared/dashboard-navbar.svelte";
  import ApplyForLeave from "../controllers/employee"
  import { onMount } from "svelte";
  import { limitDateValidation } from "../utils";
  import { createEmployeeValidation, emailValidation, isValidDateOfBirth, phoneNumber } from "../utils";
  import toast from "svelte-french-toast";
  export let id;
  let loadData=false;
  let maxDate = limitDateValidation();
  const LeaveClassObj = new ApplyForLeave()

  let dataObject = {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      contactNo: "",
      email: "",
      department:"",
      designation:"",
      dateOfJoining:"",
      role:"",
      reportingManagerEmail:""
    };

  onMount(async()=>{
    const result = await LeaveClassObj.getEmployeeData(id);
    dataObject.firstName = result.data.first_name,
    dataObject.lastName = result.data.last_name,
    dataObject.gender = result.data.gender,
    dataObject.dateOfBirth = result.data.date_of_birth,
    dataObject.contactNo = result.data.contact_no,
    dataObject.email = result.data.email_id;
    dataObject.department=result.data.department;
    dataObject.designation=result.data.designation;
    dataObject.dateOfJoining=result.data.joining_date
    dataObject.role=result.data.emp_role;
    dataObject.reportingManagerEmail=result.data.reporting_manager_email;
  })
  

  const handleSubmit=async()=>{
    loadData=true
    const result = await LeaveClassObj.updateEmployee(id,dataObject)
    if(result.statusCode===302){
        toast.success(result.message)
        setTimeout(() => {
            navigate('/employee-list')
        }, 1000);
    }else{
        toast.error(result.message)
    }
  }

</script>
<DashboardNavbar/>
<section>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</section>
<div class="d-flex justify-content-center align-items-center" id="title-of-form"><h4>Update Employee/Manager Info</h4></div>
<div class="container-lg mt-3">
    <form class="row g-2">
        <div class="form-icon"/>
        <!--Firstname Input-->
        <div class="col-md-3">
            <label for="firstname" class="form-label">Firstname :<span class="star">*</span></label>
            <input
                title="firstname"
                type="text"
                class="form-control item"
                id="firstName"
                bind:value={dataObject.firstName}
                placeholder="firstName"
            />
            {#if !(createEmployeeValidation(dataObject.firstName)) && (loadData)}
            <div class="text-danger small">Please Enter Valid First Name</div>
            {/if}
        </div>
        <div class="col-md-3">
            <label for="lastname" class="form-label">Lastname :<span class="star">*</span></label>
            <input
                title="lastname"
                type="text"
                class="form-control item"
                id="lastname"
                bind:value={dataObject.lastName}
                placeholder="lastname"
            />
            {#if !(createEmployeeValidation(dataObject.lastName)) && (loadData)}
            <div class="text-danger small">Please Enter Valid Last Name</div>
            {/if}
        </div>
        <div class="col-md-3">
            <label for="Gender" class="form-label">Gender :<span class="star">*</span></label>
            <select
                type="Gender"
                class="form-control item"
                id="Gender"
                placeholder="Gender"
                bind:value={dataObject.gender}
                ><option value="" disabled selected>Select Gender :</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">other</option>
            </select>
            {#if !(createEmployeeValidation(dataObject.gender)) && (loadData)}
            <div class="text-danger small">Please Select Valid Gender</div>
            {/if}
        </div>
        <div class="col-md-3">
            <label for="date_of_birth" class="form-label">Date of Birth :</label>
            <input
                title="date_of_birth"
                type="date"
                class="form-control item"
                id="date_of_birth"
                min= "1950-01-01"
                max= "2023-12-01"
                bind:value={dataObject.dateOfBirth}
                placeholder="date_of_birth"
            />
            {#if !(isValidDateOfBirth(dataObject.dateOfBirth)) && (loadData)}
            <div class="text-danger small">The Age Should be 18</div>
            {/if}
        </div>
        <div class="col-md-3">
            <label for="emailId" class="form-label">Email Id :<span class="star">*</span></label>
            <input
                title="emailId"
                type="email"
                class="form-control item"
                id="emailId"
                bind:value={dataObject.email}
                placeholder="emailId"
            />
            {#if !(emailValidation(dataObject.email)) && (loadData)}
            <div class="text-danger small">Please Enter Valid Email</div>
            {/if}
        </div>
       
        <div class="col-md-3">
            <label for="contactNo" class="form-label">Contact No :</label>
            <input
                title="contactNo"
                type="text"
                class="form-control item"
                id="contactNo"
                bind:value={dataObject.contactNo}
                placeholder="contactNo"
            />
            {#if !(phoneNumber(dataObject.contactNo)) && (loadData)}
            <div class="text-danger small">Please Enter Valid phone number</div>
            {/if}
        </div>
        <div class="col-md-3">
            <label for="Department" class="form-label">Department :<span class="star">*</span></label>
            <select
                type="Department"
                class="form-control item"
                id="Department"
                placeholder="Department"
                bind:value={dataObject.department}
                ><option value="" disabled selected>Select Department :</option>
                <option value="Development">Development</option>
                <option value="QA">QA</option>
            </select>
            {#if !(createEmployeeValidation(dataObject.department)) && (loadData)}
            <div class="text-danger small">Please Select Valid Department</div>
            {/if}
        </div>
        <div class="col-md-3">
            <label  for="Department" class="form-label">Designation:<span class="star">*</span></label>
            <select
                type="Designation"
                class="form-control item"
                id="Designation"
                placeholder="Designation"
                bind:value={dataObject.designation}
                ><option value="" disabled selected>Select Designation :</option>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
            </select>
            {#if !(createEmployeeValidation(dataObject.designation)) && (loadData)}
            <div class="text-danger small">Please Select Valid designation</div>
            {/if}
        </div>
        <div class="col-md-3">
            <label for="joining_date" class="form-label"> Date of Joining :<span class="star">*</span></label>
            <input
                title="joining_date"
                type="date"
                class="form-control item"
                id="joining_date"
                placeholder="joining_date" 
                max={maxDate}
                bind:value={dataObject.dateOfJoining}
            />
            {#if (dataObject.joiningDate==='') && (loadData)}
            <div class="text-danger small">Please Select Valid Date of Joining</div>
            {/if}
        </div>
        <div class="col-md-3">
            <label for="role" class="form-label">Role:<span class="star">*</span></label>
            <select
                type="role"
                class="form-control item"
                id="role"
                placeholder="role"
                bind:value={dataObject.role}
                ><option value="" disabled selected>Select Role :</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
            </select>
            {#if !(createEmployeeValidation(dataObject.role)) && (loadData)}
            <div class="text-danger small">Please Select Valid role</div>
            {/if}
        </div>
        <div class="col-md-3">
            <label for="Reporting_manager" class="form-label">Reporting Manager :<span class="star">*</span></label>
            <input
                title="Reporting_manager"
                type="email"
                class="form-control item"
                id="Reporting_manager"
                bind:value={dataObject.reportingManagerEmail}
                placeholder="Reporting_manager"
            />
            {#if !(emailValidation(dataObject.reportingManagerEmail)) && (loadData)}
            <div class="text-danger ">Please Enter Valid Email</div>
            {/if}
        </div>
        
    </form>  
    <div class="text-center mt-5 me-1">
        <button class="btn btn-success col-sm-2 mt-2" on:click|preventDefault={handleSubmit} >SUBMIT</button>
        <button class="btn btn-dark col-sm-2 mt-2" on:click={()=>{navigate('/manager-dashboard')}} >Back</button>
    </div>  
</div>
<style>
 .star{
    color: red;
}
.form-label {
    font-weight: 500;
}
.text-danger {
    font-size:smaller;
}
#title-of-form{
    margin-top: 5%;
}
</style>