<script>
	import LeaveStatus from './../components/leave-status.svelte';
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Login from "../views/login.svelte";
  import LeaveApplication from "../components/leave-application.svelte";
  import LeaveHistory from '../components/leave-history.svelte';
  import MyProfile from '../components/my-profile.svelte';
  import ChangePassword from '../components/change-password.svelte';
  import CreateEmployee from '../components/create-employee.svelte';
  import ManagerDashboard from '../views/manager-dashboard.svelte';
  import NewPassword from '../components/new-password.svelte';
  import EmployeeDashboard from '../views/employee-dashboard.svelte';
  import EmployeeList from '../components/employee-list.svelte';
  import UpdateEmployee from '../components/update-employee.svelte';
  import PendingApplications from '../components/pending-applications.svelte';
  import AppInfo from '../components/app-info.svelte';
  if(!sessionStorage.data){navigate("/")}

</script>

<Router>
  <Route path="/">
    <Login />
  </Route>
  <Route path="/changepassword">
    <NewPassword />
  </Route>
  <Route path="/manager-dashboard">
    <ManagerDashboard />
  </Route>
  <Route path="/employee-dashboard">
    <EmployeeDashboard />
  </Route>
  <Route path="/leave-application">
    <LeaveApplication/>
  </Route>
  <Route path="/my-profile">
    <MyProfile/>
  </Route>
  <Route path="/leave-history">
    <LeaveHistory/>
  </Route>
  <Route path="/leave-status">
    <LeaveStatus/>
  </Route>
  <Route path="/create-employee">
    <CreateEmployee/>
  </Route>
  <Route path="/change-password">
    <ChangePassword/>
  </Route>
  <Route path="employee-list">
    <EmployeeList/>
  </Route>
  <Route path="/update-employee/:id"  let:params>
    <UpdateEmployee id={params.id}/>
  </Route>
  <Route path="pending-applications">
    <PendingApplications/>
  </Route>
  <Route path="app-info/:id" let:params>
    <AppInfo id={params.id}/>
  </Route>
</Router>

