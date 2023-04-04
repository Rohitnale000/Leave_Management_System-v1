<script>
import createEmployee from "../controllers/manager";
const createClass = new createEmployee();

let formFields= {
    firstName:"",
    lastName: "",
    gender : "",
    dateOfBirth: "",
    emailId:"",
    password:"",
    confirmPassword:"",
    contactNo: "",
    department: "",
    designation : "",
    joiningDate : "",
    role:"",
    reportingManager: ""
}

const handleSubmit = async()=>{
   const data = await createClass.getFormdata(formFields);
   // console.log(data);
    if(data == 0){
        console.log("name error");
    }
    else{
        console.log(data,"created employee");
    }  
}

</script>
<section>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</section>
<div class="d-flex justify-content-center align-items-center mt-1"><h3>Create New Employee/Manager</h3></div>
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
                bind:value={formFields.firstName}
                placeholder="firstName"
            />
        </div>
        <div class="col-md-4">
            <label for="lastname" class="form-label">Lastname :<span class="star">*</span></label>
            <input
                title="lastname"
                type="text"
                class="form-control item"
                id="lastname"
                bind:value={formFields.lastName}
                placeholder="lastname"
            />
        </div>
        <div class="col-md-4">
            <label for="Gender" class="form-label">Gender :<span class="star">*</span></label>
            <select
                type="Gender"
                class="form-control item"
                id="Gender"
                placeholder="Gender"
                bind:value={formFields.gender}
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
                min= "1950-01-01"
                max= "2023-12-01"
                bind:value={formFields.dateOfBirth}
                placeholder="date_of_birth"
            />
        </div>
        <div class="col-md-4">
            <label for="emailId" class="form-label">Email Id :<span class="star">*</span></label>
            <input
                title="emailId"
                type="email"
                class="form-control item"
                id="emailId"
                bind:value={formFields.emailId}
                placeholder="emailId"
            />
        </div>
        <div class="col-md-4">
            <label for="password" class="form-label">Password :<span class="star">*</span></label>
            <input
                title="password"
                type="password"
                class="form-control item"
                id="password"
                bind:value={formFields.password}
                placeholder="password"
            />
        </div>
        <div class="col-md-4">
            <label for="Confirm_password" class="form-label">Confirm Password :<span class="star">*</span></label>
            <input
                title="Confirm_password"
                type="password"
                class="form-control item"
                id="Confirm_password"
                bind:value={formFields.confirmPassword}
                placeholder="Confirm_password"
            />
        </div>
        <div class="col-md-4">
            <label for="contactNo" class="form-label">Contact No :</label>
            <input
                title="contactNo"
                type="text"
                class="form-control item"
                id="contactNo"
                bind:value={formFields.contactNo}
                placeholder="contactNo"
            />
        </div>
        <div class="col-md-4">
            <label for="Department" class="form-label">Department :<span class="star">*</span></label>
            <select
                type="Department"
                class="form-control item"
                id="Department"
                placeholder="Department"
                bind:value={formFields.department}
                ><option value="" disabled selected>Select Department :</option>
                <option value="Development">Development</option>
                <option value="QA">QA</option>
            </select>
        </div>
        <div class="col-md-4">
            <label  for="Department" class="form-label">Designation:<span class="star">*</span></label>
            <select
                type="Designation"
                class="form-control item"
                id="Designation"
                placeholder="Designation"
                bind:value={formFields.designation}
                ><option value="" disabled selected>Select Designation :</option>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
            </select>
        </div>
        <div class="col-md-4">
            <label for="joining_date" class="form-label"> Date of Joining :<span class="star">*</span></label>
            <input
                title="joining_date"
                type="date"
                class="form-control item"
                id="joining_date"
                bind:value={formFields.joiningDate}
                placeholder="joining_date"
            />
        </div>
        <div class="col-md-4">
            <label for="role" class="form-label">Role:<span class="star">*</span></label>
            <select
                type="role"
                class="form-control item"
                id="role"
                placeholder="role"
                bind:value={formFields.role}
                ><option value="" disabled selected>Select Role :</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
            </select>
        </div>
        <div class="col-md-4">
            <label for="Reporting_manager" class="form-label">Reporting Manager :<span class="star">*</span></label>
            <input
                title="Reporting_manager"
                type="email"
                class="form-control item"
                id="Reporting_manager"
                bind:value={formFields.reportingManager}
                placeholder="Reporting_manager"
            />
        </div>
    </form>  

    <div class="text-center"><button class="btn btn-success col-sm-2 mt-4" on:click|preventDefault={handleSubmit}>SUBMIT</button></div>  

</div>
<style>
.star{
    color: red;
}
.form-label {
    font-weight: 500;
}
</style>