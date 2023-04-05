<script>
  import { navigate } from "svelte-routing";
  import { changePassController } from "../controllers/login";
  import toast, { Toaster } from 'svelte-french-toast';
  import { emailAndPassValidation } from "../utils";
  let newPassword = "";
  let confirmPassword = "";
  let emailId = "";
  let data = "";

  let errors = { emailError: "", passwordError: "", confpassError: "" };
  let valid = false;

  //function handleSubmit for handling submitted data and route that data based on different conditions//
  const handleSubmit = async () => {
    //email validation//
    valid = true;
    if (emailId.length === 0) {
      valid = false;
      errors.emailError ="this is required field";
    } else if (
      !emailId.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      valid = false;
      errors.emailError = 'Please enter a valid email';
    } else {
      errors.emailError = '';
    }
    //password validation//
    if (newPassword.length === 0) {
      valid = false;
      errors.passwordError = 'this is required field';
    } else if (
      !newPassword.match(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
    ) {
      valid = false;
      errors.passwordError ='password must contain atleast(1character ,1uppercase,1lowercase,1special character and number)';
    } else {
      errors.emailError = '';
    }
    //password and confirmpassword validation//
    if(confirmPassword !== newPassword){
      valid= false;
      errors.confpassError = 'passwords do not match !';
    }else{
      errors.confpassError='';
    }
    if(valid){
    const res = await emailAndPassValidation(emailId,newPassword)
    console.log(res);
    const result = await changePassController(
      emailId,
      newPassword,
      confirmPassword
    );
    try {
      if(result.statusCode===200){
        toast.success("Password Reset successful")
        navigate("/", { replace: true });

      }else
      {
        toast.error("Password Not Matches")
        navigate("/changepassword", { replace: true });
        
      }  
    } catch (error) {
      console.log(error);
    }
  }
  };
</script>
<Toaster />
<main>
  <div class="d-flex justify-content-center align-items-center"style="height: 100vh;">
    <div class="col-md-3 mt-5">
      <form>
        <!--email input-->
        <div class="form-group">
          <label class="form-label" for="emailId">Email Id :<span class="star">*</span></label>
          <div class="input-group">
            <input type="email" id="emailId" class="form-control" bind:value={emailId}/>
          </div>
          <div class="error">{errors.emailError}</div>
          <!-- new password input-->
          <div class="form-group mt-4">
            <label class="form-label" for="newPassword">New Password :<span class="star">*</span></label>
            <div class="input-group">
              <input type="password" id="newPassword" class="form-control" bind:value={newPassword}/>
            </div>
            <div class="error">{errors.passwordError}</div>
            <!-- confirm Password input -->
            <div class=" form-group mt-4 ">
              <label class="form-label" for="confirmPassword">Confirm Password :<span class="star">*</span></label>
              <div class="input-group">
                <input type="password" id="loginPassword" class="form-control" bind:value={confirmPassword}/>
              </div>
              <div class="error">{errors.confpassError}</div>
              <!--Submit Button-->
              <button type="submit" class="btn btn-success btn-block mb-6 mt-4 pl-2 pr-3"value="login" on:click|preventDefault={handleSubmit}>SUBMIT</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</main>

<style>
  .form-label {
    font-weight: 500;
  }
  .input-group-addon {
    background-color: #f2f2f2;
    width: 40px;
    border-radius: 5px;
    text-align: center;
  }
  .star {
    color: red;
  }
  .error{
    color:red;
    margin-top:0px;
    font-size: smaller;
  }
  .none {
    display: none;
  }
</style>
