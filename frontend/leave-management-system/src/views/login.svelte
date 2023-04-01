<script>
  import Icon from "@iconify/svelte";
  import { loginController } from "../controllers/login";
  import { navigate } from "svelte-routing";
  // import Sidebar from "../components/shared/sidebar.svelte";
  import Navigation from "../components/shared/navigation.svelte";
  import { storeData } from "../store/store";
  import toast, { Toaster } from "svelte-french-toast";
  // import { checkEmail, checkPassword } from "../utils/index";
  let emailId = "";
  let password = "";
  let writeInStore;
  //function handleSubmit for handling submitted data and route that data based on different conditions//
  const handleSubmit = async () => {
    const submitResponse = await loginController(emailId, password);
    // console.log(submitResponse.data.update_password);
   writeInStore = await submitResponse;
    let data = storeData.set(await writeInStore);
    console.log(data);

    try {
      if (
        submitResponse.statusCode === 200 &&
        submitResponse.data.update_password == "0"
      ) {
        toast.success("You have successfully login Please REST Password");
        navigate("/changepassword", { replace: true });
      } else if (
        submitResponse.statusCode == 200 &&
        submitResponse.data.update_password == "1" &&
        submitResponse.data.emp_role == "Manager"
      ) {
        navigate("/manager-dashboard", { replace: true });
      } else if (
        submitResponse.statusCode == 200 &&
        submitResponse.data.update_password == "1" &&
        submitResponse.data.emp_role == "Employee"
      ) {
        
        navigate("/employee-dashboard", { replace: true });
       

      } else if (submitResponse.statusCode == 400 && success == false) {
        console.log("wrong password");
        navigate("/", { replace: true });
      } else {
        console.log("welcome to LMS");
      }
    } catch (error) {
      console.log("error occured");
    }
  };
</script>

<Toaster />
<main>
  <Navigation />
  <!-- <Sidebar/> -->
  <!-- <Navigation/> -->
  <div
    class="d-flex justify-content-center align-items-center mt-1"
    style="height: 90vh;"
  >
    <div class="col-md-4">
      <form>
        <!--Email input-->
        <div class="form-group">
          <label class="form-label" for="emailId"
            >Email Id :<span class="star">*</span></label
          >
          <div class="input-group">
            <div class="input-group-addon">
              <span class="icons"
                ><Icon
                  icon="material-symbols:alternate-email-rounded"
                  width="20"
                  height="20"
                /></span
              >
            </div>
            <input
              type="email"
              id="emailId"
              class="form-control"
              bind:value={emailId}
            />
          </div>

          <!-- Password input -->
          <div class=" form-group mt-4 ">
            <label class="form-label" for="loginPassword"
              >Password :<span class="star">*</span></label
            >
            <div class="input-group">
              <div class="input-group-addon">
                <span class="icons"
                  ><Icon
                    icon="material-symbols:lock-open-outline-sharp"
                    width="20"
                    height="20"
                  /></span
                >
              </div>
              <input
                type="password"
                id="loginPassword"
                class="form-control"
                bind:value={password}
              />
            </div>
            <!--logIn Button-->
            <button
              type="submit"
              class="btn btn-success btn-block mb-6 mt-4 pl-2 pr-3"
              value="login"
              on:click|preventDefault={handleSubmit}>LOG IN</button
            >
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
</style>
