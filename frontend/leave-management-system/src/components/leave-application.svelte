<script>
  import toast, { Toaster } from "svelte-french-toast";
  import { navigate } from "svelte-routing";
  import { Confirm } from "svelte-confirm";
  import ApplyForLeave from "../controllers/employee";
  import DashboardNavbar from "./shared/dashboard-navbar.svelte";
  import SidebarEmployee from "./shared/sidebar-employee.svelte";

  //create object of that class
  let errors = {
    leavetypeError: "",
    daytypeError: "",
    fromdateError: "",
    todateError: "",
    dayError: "",
  };
  let valid = false;

  //create class object
  const LeaveClassObj = new ApplyForLeave();

  //current date and next date logic
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate());
  let minDate = yesterday.toISOString().split("T")[0];

  //get login employee data from sessionStorage
  let loginUserObject = JSON.parse(sessionStorage.getItem("data"));
  const formFields = {
    typeOfLeave: "",
    typeOfDay: "",
    fromDate: "",
    toDate: "",
    reason: "",
    empId: loginUserObject.emp_id,
    reportingManagerEmail: loginUserObject.reporting_manager_email,
  };
  //handle submit event for leave application
  const handleSubmit = async () => {
    valid = true;
    if (formFields.typeOfLeave == "") {
      valid = false;
      errors.leavetypeError = "Please select leave type";
    } else {
      errors.leavetypeError = "";
    }
    if (formFields.typeOfDay == "") {
      valid = false;
      errors.daytypeError = "Please select (full/half) day";
    } else {
      errors.daytypeError = "";
    }
    if (formFields.fromDate.length === 0) {
      valid = false;
      errors.fromdateError = "please select valid date";
    } else {
      errors.fromdateError = "";
    }
    if (formFields.toDate.length === 0) {
      valid = false;
      errors.todateError = "please select valid date";
    } else {
      errors.todateError = "";
    }
    if (formFields.typeOfDay === "Half Day") {
      if (formFields.fromDate !== formFields.toDate) {
        valid = false;
        errors.dayError =
          "You choose Half Day and do not select a valid date(Same Date)";
      } else {
        errors.dayError = "";
      }
    } else {
      errors.dayError = "";
    }
    //using class object call methods from that class
    //also send data that you want to send to class
    if (valid) {
      let result = await LeaveClassObj.getFormData(formFields);
      if (result.statusCode === 201) {
        toast.success("You have successfully applied for leave");
        navigate("/leave-application");
      } else if (result.statusCode === 404) {
        toast.error(result.message);
        navigate("/leave-application");
      }
    }
  };

  const navigateTo = (para) => {
    navigate(para);
  };
</script>

<Toaster />
<DashboardNavbar />
<SidebarEmployee />
<!-- <div class="heading_box"><h5>Apply Leave <span><Icon icon="iconoir:help-circle" /></span></h5></div> -->
<main class="box position-fixed">
  <div class="container-fluid">
    <br />
    <!-- <marquee class="blink">If You are apply for Half Day Please Select <b>Same Date</b></marquee> -->
    <form class="row g-4">
      <div class="form-icon" />
      <!--Firstname Input-->
      <div class="col-md-3">
        <label for="leave_type" class="form-label"
          >Type of Leave <span class="star">*</span></label
        >
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
        <label for="half Day" class="form-label"
          >Type of Day <span class="star">*</span></label
        >
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
        <label for="From date" class="form-label"
          >From Date <span class="star">*</span></label
        >
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
        <label for="To date" class="form-label"
          >To Date <span class="star">*</span></label
        >
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
      <div class="col-md-4">
        <label for="Approver" class="form-label"
          >Approver <span class="star">*</span></label
        >
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
        <label for="Reason for leave" class="form-label">Reason For leave</label
        >
        <textarea
          class="form-control"
          id="Reason for leave"
          bind:value={formFields.reason}
          rows="2"
          col="4"
          maxlength="250"
        />
      </div>
    </form>
    <div class="text-center">
      <button
        class="btn btn-success col-sm-1 mt-4"
        on:click|preventDefault={handleSubmit}>Apply</button
      >
      <!-- <button class="btn btn-dark col-sm-1 mt-4" on:click={()=>{navigate("/employee-dashboard")}} >Cancel</button> -->
      <Confirm
        confirmTitle="Confirm"
        cancelTitle="Cancel"
        let:confirm={confirmThis}
      >
        <button
          class="btn btn-dark col-sm-1 mt-4"
          on:click={() => confirmThis(navigateTo, "/employee-dashboard")}
          >Cancel</button
        >
        <span slot="title"> Are You Sure? </span>
        <span slot="description"> You won't be able to revert this! </span>
      </Confirm>
    </div>
  </div>
</main>

<style>
  .form-label {
    font-weight: 500;
  }
  .star {
    color: red;
  }
  .box {
    display: flex;

    margin: 40px;
    margin-top: 10%;
    margin-left: 25%;
  }

  .error {
    color: red;
    margin-top: 0px;
    font-size: smaller;
  }
</style>
