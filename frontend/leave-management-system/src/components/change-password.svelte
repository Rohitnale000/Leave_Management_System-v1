<script>
  import { navigate } from "svelte-routing";
  import { storeData } from "../store/store";
  import ApplyForLeave from "../controllers/employee";
  import toast, { Toaster } from "svelte-french-toast";
  //get data from store//
  // let loginUserObject = {};
  // storeData.subscribe((value) => {
  //   loginUserObject = value;
  // });
  let loginUserObject= JSON.parse(sessionStorage.getItem('data'));
  const formFields = {
    oldPassword: "",
    newPassword: "",
    confPassword: "",
    id: loginUserObject.emp_id,
  };
  //controller class instance//
  const LeaveClassObj = new ApplyForLeave();
  //store error massages into object//
  let errors = { oldPassError: "", newPassError: "", conPassError: "" };
  let valid = false;
  const handleSubmit = async () => {
    valid = true;
    if (formFields.oldPassword.length === 0) {
      valid = false;
      errors.oldPassError = "this is required field";
    } else if (
      !formFields.oldPassword.match(
        /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
      )
    ) {
      valid = false;
      errors.oldPassError =
        "password must contain atleast(1character ,1uppercase,1lowercase,1special character and number)";
    } else {
      errors.oldPassError = "";
    }
    if (formFields.newPassword.length === 0) {
      valid = false;
      errors.newPassError = "this is required field";
    } else if (
      !formFields.newPassword.match(
        /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
      )
    ) {
      valid = false;
      errors.newPassError =
        "password must contain atleast(1character ,1uppercase,1lowercase,1special character and number)";
    } else {
      errors.newPassError = "";
    }
    if (formFields.confPassword !== formFields.newPassword) {
      valid = false;
      errors.conPassError =
        "new password and confirm password does not match !";
    } else {
      errors.conPassError = "";
    }
    if (valid) {
      try {
        const result = await LeaveClassObj.changePassword(formFields);
        console.log(result);
        if (result.statusCode === 200) {
          toast.success("You have successfully changed your password");
          setTimeout(() => {
            navigate("/employee-dashboard", { replace: true });
          }, 1000);
        } else if (result.statusCode === 400) {
          toast.error("Old password does not");
          navigate("/change-password", { replace: true });
        } else if (result.statusCode === 404) {
          navigate("/change-password", { replace: true });
        }
      } catch (error) {
        console.log("error");
      }
    }
  };
</script>

<Toaster />
<main>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh;"
  >
    <div class="col-md-4 mt-5">
      <!--old password input-->
      <div class="form-group">
        <div>
          <label class="form-label" for="emailId"
            >Old Password:<span class="star">*</span></label
          >
          <div class="input-group mt-2">
            <input
              type="password"
              id="emailId"
              class="form-control"
              bind:value={formFields.oldPassword}
            />
          </div>
          <span class="error">{errors.oldPassError}</span>
        </div>
        <!-- new password input-->
        <div>
          <label class="form-label" for="newPassword"
            >New Password :<span class="star">*</span></label
          >
          <div class="input-group mt-2">
            <input
              type="password"
              id="newPassword"
              class="form-control"
              bind:value={formFields.newPassword}
            />
          </div>
          <span class="error">{errors.newPassError}</span><br />
        </div>
        <!-- confirm Password input -->
        <div>
          <label class="form-label" for="confirmPassword"
            >Confirm Password :<span class="star">*</span></label
          >
          <div class="input-group mt-2">
            <input
              type="password"
              id="loginPassword"
              class="form-control"
              bind:value={formFields.confPassword}
            />
          </div>
          <span class="error">{errors.conPassError}</span>
        </div>
      </div>
      <!--Submit Button-->
      <button
        type="submit"
        class="btn btn-success col-md-4 mt-4 px-2"
        value="login"
        style="padding-right: 10px;"
        on:click|preventDefault={handleSubmit}>SUBMIT</button
      >
      <button
        type="submit"
        class="btn btn-dark col-md-3 mt-4"
        value="Back"
        on:click={() => {
          navigate("/employee-dashboard");
        }}>BACK</button
      >
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
  .buttons {
    width: 30px;
  }
  .error {
    color: red;
    margin-top: 0px;
    font-size: smaller;
  }
</style>
