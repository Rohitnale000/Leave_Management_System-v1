<script>
    import { storeData } from "../store/store";
    import { navigate } from "svelte-routing";
    import  ApplyForLeave from "../controllers/employee";
    import { onMount } from "svelte";
    import { isValidDateOfBirth } from "../utils/index";
    import toast, { Toaster } from "svelte-french-toast";
    import { Confirm } from 'svelte-confirm';
    let errors = {
      nameError: "",
      lastNameError: "",
      contactError: "",
      emailError: "",
      dateError: "",
    };
    let valid = false;
    const LeaveClassObj = new ApplyForLeave();
    let result;
    // let loginUserObject = {};
    // storeData.subscribe((value) => {
    //   loginUserObject = value;
    // });
    let loginUserObject= JSON.parse(sessionStorage.getItem('data'));
    let id = loginUserObject.emp_id;
    let dataObject = {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      contactNo: "",
      email: "",
      id: id,
    };
    onMount(async () => {
      result = await LeaveClassObj.getEmployeeData(id);
        (dataObject.firstName = result.data.first_name),
        (dataObject.lastName = result.data.last_name),
        (dataObject.gender = result.data.gender),
        (dataObject.dateOfBirth = result.data.date_of_birth),
        (dataObject.contactNo = result.data.contact_no),
        (dataObject.email = result.data.email_id);
    });
    const handleUpdateData = async () => {
      valid = true;
      //  console.log(dataObject.email);
      if ((dataObject.email).length === 0) {
        valid = false;
        errors.emailError = "Email should not be empty";
      } else if (!(dataObject.email).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        valid = false;
        errors.emailError = "Please enter a valid email address";
      } else {
        errors.emailError = "";
      }
      if ((dataObject.firstName).length === 0) {
        valid = false;
        errors.nameError = "Name should not be blank";
      } else if (!(dataObject.firstName).match(/^[A-Za-z]+$/)) {
        valid = false;
        errors.nameError = "Please enter only alphabetical letters";
      } else {
        errors.nameError = "";
      }
      if ((dataObject.lastName).length === 0) {
        valid = false;
        errors.lastNameError = "Last name should not be blank";
      } else if (!(dataObject.lastName).match(/^[A-Za-z]+$/)) {
        valid = false;
        errors.lastNameError = "Please enter only alphabetical letters";
      } else {
        errors.lastNameError = "";
      }
      if (!(dataObject.contactNo).match(/^\d{10}$/)) {
        valid = false;
        errors.contactError = "Please enter valid number";
      } else {
        errors.contactError = "";
      }
      if (!isValidDateOfBirth(dataObject.dateOfBirth)) {
        valid = false;
        errors.dateError = "Age must be minimum 18 years";
      } else {
        errors.dateError = "";
      }
      if (valid) {
        try{
          const result = await LeaveClassObj.getDataFromMyProfile(dataObject);
        if (result.statusCode === 200) {
          toast.success("Your profile has been successfully updated")
          setTimeout(() => {
            navigate("/employee-dashboard");
          }, 1000);
        }
        if(result.statusCode === 400){
          toast.error("error updating profile..");
        }
        }catch(error){
          console.log("Errors while updating my profile");
        }
      }
    };
  </script>
  <Toaster />
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
            <span class="error">{errors.nameError}</span>
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
            <span class="error">{errors.lastNameError}</span>
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
            <span class="error">{errors.dateError}</span>
        </div>
       
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
            <span class="error">{errors.contactError}</span>
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
            <span class="error">{errors.emailError}</span>
        </div>
        
    <div class="text-center">

      <button class="btn btn-success col-sm-2 mt-4" on:click|preventDefault={handleUpdateData}>Update</button>  
      <button class="btn btn-dark col-sm-2 mt-4" on:click|preventDefault={()=>{navigate('/employee-dashboard')}}>Back</button>
  </div>  
    <!-- <div class="text-center"><button class="btn btn-primary col-sm-2 mt-4" on:click|preventDefault={navigateTO('/employee-dashboard')}>Back</button></div>   -->
  
</div>    
{/if}

<style>
    .star{
        color:red;
    }
    .error{
    color:red;
    margin-top:0px;
    font-size: smaller;
  }
.form-label {
    font-weight: 500;
}
.mt-5{
  margin-top: 9rem!important
}
</style>









