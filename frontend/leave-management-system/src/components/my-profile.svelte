
<script>
import { storeData } from "../store/store";
import { navigate } from "svelte-routing";
import ApplyForLeave from "../controllers/employee"
  import { onMount } from "svelte";
const LeaveClassObj = new ApplyForLeave()
let result


let loginUserObject={}
  storeData.subscribe(value=>{
    loginUserObject = value
  })


  let id=loginUserObject.data.emp_id

 let dataObject={
    firstName:"",
    lastName:"",
    gender:"",
    dateOfBirth:"",
    contactNo:"",
    email:"",
    id:id
}

 onMount(async()=>{
    result = await LeaveClassObj.getEmployeeData(id)
    dataObject.firstName=result.data.first_name,
    dataObject.lastName=result.data.last_name,
    dataObject.gender=result.data.gender,
    dataObject.dateOfBirth=result.data.date_of_birth,
    dataObject.contactNo=result.data.contact_no,
    dataObject.email=result.data.email_id    
 })

 

//   let empDataObject={
//     empId:loginUserObject.data.emp_id,
//     firstName:result.data.first_name,
//     lastName:result.data.last_name,
//     gender:result.data.gender,
//     dateOfBirth:result.data.date_of_birth,
//     contactNo:result.data.contact_no,
//     email:result.data.email_id
//   }


  const handleUpdateData=async()=>{
    const result = await LeaveClassObj.getDataFromMyProfile(dataObject)
   if(result.statusCode===200){
    navigate("/employee-dashboard") 
   }

  }

//   const navigateTO = async (parameter)=>{
//     navigate(parameter)F
//   }
  
 
    
</script>
{#if result}
<section>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</section>

<div class="d-flex justify-content-center align-items-center mt-5"><h3><b>My</b>  Profile</h3></div>
<div class="container-lg mt-3">
  
    <form class="row g-4">
        <div class="form-icon"/>
        <!--Firstname Input-->
        <div class="col-md-4">
            <label for="firstname" class="form-label">Firstname :<span class="star">*</span></label>
            <input
                pattern="[^0-9]+"
                title="firstname"
                type="text"
                class="form-control item"
                id="firstName"
                placeholder="firstName"
                bind:value={dataObject.firstName}
            />
        </div>
        <div class="col-md-4">
            <label for="lastname" class="form-label">Lastname :<span class="star">*</span></label>
            <input
                title="lastname"
                type="text"
                class="form-control item"
                id="lastname"
                placeholder="lastname"
                bind:value={dataObject.lastName}
            />
        </div>
        <div class="col-md-4">
            <label for="Gender" class="form-label">Gender :<span class="star">*</span></label>
            <select
                type="Gender"
                class="form-control item"
                id="Gender"
                bind:value={dataObject.gender}
                placeholder="Gender"
                ><option value="" disabled selected>Select Gender :</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">other</option>
                </select>
        </div>
        <div class="col-md-4">
            <label for="date_of_birth" class="form-label">Date of Birth :</label>
            <input
                title="date_of_birth"
                type="date"
                class="form-control item"
                id="date_of_birth"
                placeholder="date_of_birth"
                min="1950-01-01"
                max="2023-12-31"
                bind:value={dataObject.dateOfBirth}
            />
        </div>
        <!-- <div class="col-md-4">
            <label for="password" class="form-label">Password :<span class="star">*</span></label>
            <input
                title="password"
                type="password"
                class="form-control item"
                id="password"
                placeholder="password"
                bind:value={empDataObject.password}
            />
        </div>
        <div class="col-md-4">
            <label for="Confirm_password" class="form-label">Confirm Password :<span class="star">*</span></label>
            <input
                title="Confirm_password"
                type="password"
                class="form-control item"
                id="Confirm_password"
                placeholder="Confirm_password"
                
            />
        </div> -->
        <div class="col-md-4">
            <label for="contactNo" class="form-label">Contact No :</label>
            <input
                title="contactNo"
                type="text"
                class="form-control item"
                id="contactNo"
                placeholder="contactNo"
                bind:value={dataObject.contactNo}
            />
        </div>
        <div class="col-md-4">
            <label for="contactNo" class="form-label">Email/Username</label>
            <input
                title="contactNo"
                type="email"
                class="form-control item"
                id="email/username"
                placeholder="contactNo"
                bind:value={dataObject.email}
            />
        </div>
        
    <div class="text-center"><button class="btn btn-success col-sm-2 mt-4" on:click|preventDefault={handleUpdateData}>Update</button>  
   <button class="btn btn-dark col-sm-2 mt-4" on:click|preventDefault={()=>{navigate('/employee-dashboard')}}>Back</button></div>  
    <!-- <div class="text-center"><button class="btn btn-primary col-sm-2 mt-4" on:click|preventDefault={navigateTO('/employee-dashboard')}>Back</button></div>   -->
  
</div>    
{/if}
