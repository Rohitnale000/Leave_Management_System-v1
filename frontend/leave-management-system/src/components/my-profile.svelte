

<script>
import { storeData } from "../store/store";
import ApplyForLeave from "../controllers/employee"
const LeaveClassObj = new ApplyForLeave()
let loginUserObject={}
  storeData.subscribe(value=>{
    loginUserObject = value
  })
  


//take all feilds inside one object refrance is leave-application.svelte file

  const handleUpdateData=(loginUserObject)=>{
    const result = LeaveClassObj.getDataFromMyProfile(loginUserObject)
  }
    
</script>



<section>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</section>
<div class="d-flex justify-content-center align-items-center mt-1"></div>
<div class="container-lg mt-3">
    <form class="row g-4">
        <div class="form-icon"/>
        <!--Firstname Input-->
        <div class="col-md-4">
            <label for="firstname" class="form-label">Firstname :<span class="star">*</span></label>
            <input
                title="firstname"
                type="text"
                class="form-control item"
                id="firstName"
                placeholder="firstName"
                bind:value={loginUserObject.data.first_name}
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
                bind:value={loginUserObject.data.last_name}
            />
        </div>
        <div class="col-md-4">
            <label for="Gender" class="form-label">Gender :<span class="star">*</span></label>
            <select
                type="Gender"
                class="form-control item"
                id="Gender"
                bind:value={loginUserObject.data.gender}
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
                bind:value={loginUserObject.data.date_of_birth}
            />
        </div>
        <div class="col-md-4">
            <label for="password" class="form-label">Password :<span class="star">*</span></label>
            <input
                title="password"
                type="password"
                class="form-control item"
                id="password"
                placeholder="password"
                bind:value={loginUserObject.data.emp_password}
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
                bind:value={loginUserObject.data.emp_password}
            />
        </div>
        <div class="col-md-4">
            <label for="contactNo" class="form-label">Contact No :</label>
            <input
                title="contactNo"
                type="password"
                class="form-control item"
                id="contactNo"
                placeholder="contactNo"
                bind:value={loginUserObject.data.contact_no}
            />
        </div>
        
    <div class="text-center"><button class="btn btn-primary col-sm-2 mt-4" on:click|preventDefault={handleUpdateData}>Update</button></div>  

</div>