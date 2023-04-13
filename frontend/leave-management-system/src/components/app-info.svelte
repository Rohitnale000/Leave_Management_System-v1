<script>
  import { navigate } from "svelte-routing";
import createEmployee from "../controllers/manager";
  import { onMount } from "svelte";
const classObj = new createEmployee()
export let id;

let dataObject ={
    fromDate:"",
    toDate:"",
    typeOfLeave:"",
    reason:"",
    totalNoOfLeave:""
}
onMount(async()=>{
    const result = await classObj.getSingleLeaveApplication(id)
    dataObject.fromDate=result.data.from_date
    dataObject.toDate=result.data.to_date
    dataObject.typeOfLeave=result.data.type_of_leave
    dataObject.reason=result.data.reason
    dataObject.totalNoOfLeave=result.data.no_of_leave
})

</script>

<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Leave Applications Details</h5>
      </div>
      <div class="modal-body">
      <h6>From Date: <span>{dataObject.fromDate}</span></h6>
      <h6>To Date: <span>{dataObject.toDate}</span></h6>
      <h6>Type of Leave: <span>{dataObject.typeOfLeave}</span></h6>
      <h6>Reason: <span>{dataObject.reason}</span> </h6>
      <h6>Total No of Days: <span>{dataObject.totalNoOfLeave}</span> </h6>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={()=>{navigate('/pending-applications')}}>Close</button>
      </div>
    </div>
  </div>
</div>

<style>
  span{
    color: #647C90
  }
</style>