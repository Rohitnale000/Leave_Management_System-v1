<script>
    import DashboardNavbar from "./shared/dashboard-navbar.svelte";
    import { storeData } from "../store/store";
    import { onMount } from "svelte";
    import createEmployee from "../controllers/manager";
    const listofEmp = new createEmployee();
    let managerEmailId;
      storeData.subscribe((value) => {
        managerEmailId = value.data.email_id;
      });
      console.log(managerEmailId);
      //show list of pending and approved leave application when component is mounted//
      onMount=(async()=>{
        const result = await listofEmp.getPendinglist(managerEmailId,page);
        console.log(result);
      })
    </script>
    <DashboardNavbar/>
    <div class="container-fluid" style="margin-top: 50px;">
        <div class="table-responsive mx-auto">
            <div class="table-wrapper">
                <div class="table-title mt-3">
                    <div class="row">
                        <div class="col-sm-8 mb-4" style="color:green"><h2>Employee <b>List</b></h2></div>
                        <div class="col-sm-4">
                            <div class="search-box">
                                <input type="text" class="form-control" placeholder="Search…">
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover table-bordered">
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
                        <tr>
                            <td>1</td>
                            <td>Thomas Hardy</td>
                            <td>Paid Leave</td>
                            <td>9049360912</td>
                            <td>Pending</td>
                            <td class="buttons-column">
                                <span class="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
                                    <button class="btn btn-primary" type="button" disabled>Details</button>
                                </span>
                                <span>
                                    <button class="btn btn-success" type="button">Approve</button>
                                </span>
                                <span>
                                    <button class="btn btn-danger" type="button">Reject</button>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="clearfix">
                    <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                    <ul class="pagination">
                        <li class="page-item disabled"><a href="#"><i class="fa fa-angle-double-left"></i></a></li>
                        <li class="page-item"><a href="#" class="page-link">1</a></li>
                        <li class="page-item"><a href="#" class="page-link">2</a></li>
                        <li class="page-item active"><a href="#" class="page-link">3</a></li>
                        <li class="page-item"><a href="#" class="page-link">4</a></li>
                        <li class="page-item"><a href="#" class="page-link">5</a></li>
                        <li class="page-item"><a href="#" class="page-link"><i class="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <style>
    .buttons-column{
        display: flex;
        justify-content: space-around;
    }
    </style>