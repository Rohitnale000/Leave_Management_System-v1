<script>
  import DashboardNavbar from "./shared/dashboard-navbar.svelte";
  import createEmployee from "../controllers/manager";
  import { paginate, LightPaginationNav } from "svelte-paginate";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import toast, { Toaster } from "svelte-french-toast";
  import { Confirm } from "svelte-confirm";

  const classObj = new createEmployee();
  let loginUserObject = JSON.parse(sessionStorage.getItem("data"));
  let items = [];
  let currentPage = 1;
  let pageSize = 8;
  let flag = false;
  let searchInput = "";
  $: paginatedItems = paginate({ items, pageSize, currentPage });

  onMount(async () => {
    try {
      const result = await classObj.getLeaveApplications(
        loginUserObject.email_id
      );
      if (result.statusCode === 200) {
        items = await result.data;
      } else {
        flag = true;
      }
    } catch (error) {
      console.log(error);
    }
  });

  const handleDetails = async (data) => {
    navigate(`/app-info/${data.app_id}`);
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      const result = await classObj.searchLeaveApplication(
        searchInput,
        loginUserObject.email_id
      );
      if (result.statusCode === 302) {
        console.log(result.data);
        items = await result.data;
      } else if (result.statusCode === 404) {
        console.log("inside else block");
        flag = true;
      }
    }
  };

  const handleReject = async (data) => {
    try {
      const result = await classObj.rejectLeaveApplication(
        data.app_id,
        data.emp_id
      );
      if (result.statusCode === 200) {
        toast.success("Leave has been Rejected Successfully");
        const result1 = await classObj.getLeaveApplications(
          loginUserObject.email_id
        );
        items = result1.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<Toaster />
<DashboardNavbar />
{#if flag === false}
  <div class="container-fluid mt-3 pt-5">
    <div class="form-outline mb-2">
      <input
        type="search"
        id="form1"
        class="form-control"
        placeholder="Search + Enter"
        aria-label="Search"
        bind:value={searchInput}
        on:keypress={handleSearch}
      />
    </div>
    <table
      class="table table-striped table-hover table-bordered table-responsive"
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Name </th>
          <th>Leave Type</th>
          <th>Contact No </th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each paginatedItems as i, count}
          <tr>
            <td>{count + 1}</td>
            <td>{i.first_name + " " + i.last_name}</td>
            <td>{i.type_of_leave}</td>
            <td>{i.contact_no}</td>
            <td>{i.leave_status}</td>
            <td class="buttons-column">
              <span>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  on:click={handleDetails(i)}>Details</button
                >
              </span>
              <span>
                <Confirm
                  confirmTitle="Confirm"
                  cancelTitle="Cancel"
                  let:confirm={confirmThis}
                >
                <button class="btn btn-success" type="button" on:click={()=>confirmThis()}>Approve</button>
                 <span slot="title"> Are You Sure? </span>
                  <span slot="description">
                    You won't be able to revert this!
                  </span>
                </Confirm>
              </span>
              <span>
                <Confirm
                  confirmTitle="Confirm"
                  cancelTitle="Cancel"
                  let:confirm={confirmThis}
                >
                  <button
                    class="btn btn-danger"
                    type="button"
                    on:click={() => confirmThis(handleReject, i)}>Reject</button
                  >
                  <span slot="title"> Are You Sure? </span>
                  <span slot="description">
                    You won't be able to revert this!
                  </span>
                </Confirm>
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="ml-3 col-md-3 mb-3 w-100 d-flex justify-content-between">
      <LightPaginationNav
        totalItems={items.length}
        {pageSize}
        {currentPage}
        limit={1}
        showStepOptions={true}
        on:setPage={(e) => (currentPage = e.detail.page)}
      />
      <button
        class="btn btn-dark"
        type="button"
        on:click={() => {
          navigate("/manager-dashboard");
        }}>Back</button
      >
    </div>
  </div>
{:else}
  <h1>There is no records available</h1>
{/if}

<style>
  h1 {
    margin-top: 10%;
    text-align: center;
  }
</style>
