<script>
  import { navigate } from "svelte-routing";
  import { changePassController } from "../controllers/login";
  import toast, { Toaster } from 'svelte-french-toast';
  let newPassword = "";
  let confirmPassword = "";
  let emailId = "";
  let data = "";

  //function handleSubmit for handling submitted data and route that data based on different conditions//
  const handleSubmit = async () => {
    const result = await changePassController(
      emailId,
      newPassword,
      confirmPassword
    );
     console.log(result);
   
    try {
      if(result.statusCode===200){
        toast.success("You have successfully REST Your's Password")
        navigate("/", { replace: true });

      }else
      {
        toast.error("Password Not Matches")
        navigate("/changepassword", { replace: true });
        
      }  
    } catch (error) {
      
    }
  };
</script>
<Toaster />
<main>
  <div class="d-flex justify-content-center align-items-center"style="height: 100vh;">
    <div class="col-md-3">
      <form>
        <!--email input-->
        <div class="form-group">
          <label class="form-label" for="emailId">Email Id :<span class="star">*</span></label>
          <div class="input-group">
            <input type="email" id="emailId" class="form-control" bind:value={emailId}/>
          </div>
          <!-- new password input-->
          <div class="form-group mt-4">
            <label class="form-label" for="newPassword">New Password :<span class="star">*</span></label>
            <div class="input-group">
              <input type="password" id="newPassword" class="form-control" bind:value={newPassword}/>
            </div>

            <!-- confirm Password input -->
            <div class=" form-group mt-4 ">
              <label class="form-label" for="confirmPassword">Confirm Password :<span class="star">*</span></label>
              <div class="input-group">
                <input type="password" id="loginPassword" class="form-control" bind:value={confirmPassword}/>
              </div>
              <div class={data === 0 ? "error-div" : "none"}>Passwords do not match</div>
              <!--Submit Button-->
              <button type="submit" class="btn btn-primary btn-block mb-6 mt-4 pl-2 pr-3"value="login" on:click|preventDefault={handleSubmit}>SUBMIT</button>
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
  .error-div {
    color: red;
  }
  .none {
    display: none;
  }
</style>
