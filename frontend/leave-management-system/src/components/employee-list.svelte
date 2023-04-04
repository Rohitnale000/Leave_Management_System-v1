<script>
    import Icon from "@iconify/svelte";
    import { storeData } from "../store/store";
    import { onMount } from "svelte";
    import createEmployee from "../controllers/manager";
    //create a class instance//
    const listofEmp = new createEmployee();
    //get manager email id from store//
    let managerEmailId;
    storeData.subscribe((value) => {
      managerEmailId = value.data.email_id;
    });
    console.log(managerEmailId);
    //store result from services into array//
    let listArray=[] ;
    let totalRecords ="";
    let recordsOnPage = "";
    let totalCount= 0;
    let limit=2;
    //call class method getEmployeeList and pass email,page from it//
    $:page =1
    onMount(async() => {
     const result= await listofEmp.getEmployeeList(managerEmailId,page);
      console.log(await result);
      listArray=result.data;
      recordsOnPage= listArray.length;
      totalCount = result.totalCount;
      console.log(totalRecords);
      totalPages = Math.ceil(totalCount/limit);
      // recordsOnPage = Math.ceil(totalRecords/2);
      console.log(recordsOnPage,"recordson page")
     console.log(await listArray,"im listaray");
    });
  </script>
  <div class="container-xl">
    <div class="table-responsive">
      <div class="table-wrapper">
        <div class="table-title mt-3">
          <div class="row">
            <div class="col-sm-8 mb-4" style="color:green">
              <h2>Employee <b>List</b></h2>
            </div>
            <div class="col-sm-4">
              <div class="search-box">
                <input type="text" class="form-control" placeholder="Search…" />
              </div>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name </th>
              <th>Email Id</th>
              <th>Department </th>
              <th>Designation</th>
              <th>Date of Joining </th>
              <th>Contact No</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {#each listArray as emp}
            <tr>
              <td>1</td>
              <td>{emp.first_name}</td>
              <td>{emp.email_id}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>{emp.joining_date}</td>
              <td>{emp.contact_no}</td>
              <td>{emp.emp_role}</td>
              <td>
                <a
                  href="#"
                  class="edit"
                  title=""
                  data-toggle="tooltip"
                  data-original-title="Edit"
                  ><Icon
                    icon="ph:pencil-line-fill"
                    color="#FFDE5D"
                    width="30"
                  /></a
                >
                <a
                  href="#"
                  class="delete"
                  title=""
                  data-toggle="tooltip"
                  data-original-title="Delete"
                  ><Icon icon="ic:twotone-delete" color="crimson" width="30" />
                </a>
              </td>
            </tr>
            {/each}
          </tbody>
        </table>
        <div class="clearfix">
          <div class="hint-text">Showing <b>{recordsOnPage}</b> out of <b>{totalCount}</b> entries</div>
          <ul class="pagination">
            <li class="page-item disabled">
              <a href="#"><i class="fa fa-angle-double-left" /></a>
            </li>
            <li class="page-item"><a href="#" class="page-link">1</a></li>
            <li class="page-item"><a href="#" class="page-link">2</a></li>
            <li class="page-item active"><a href="#" class="page-link">3</a></li>
            <li class="page-item"><a href="#" class="page-link">4</a></li>
            <li class="page-item"><a href="#" class="page-link">5</a></li>
            <li class="page-item">
              <a href="#" class="page-link"
                ><i class="fa fa-angle-double-right" /></a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>