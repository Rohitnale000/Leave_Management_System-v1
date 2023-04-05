<script>
	import LeaveStatus from './../components/leave-status.svelte';
  import { Router, Link, Route } from "svelte-routing";
  import Newpassword from "../components/new-password.svelte";
  import Login from "../views/login.svelte";
  import Managerdashboard from "../views/manager-dashboard.svelte";
  import Employeedashboard from "../views/employee-dashboard.svelte";
  import LeaveApplication from "../components/leave-application.svelte";
  import LeaveHistory from '../components/leave-history.svelte';
  import MyProfile from '../components/my-profile.svelte';
  import ChangePassword from '../components/change-password.svelte';
</script>

<Router>
  <Route path="/">
    <Login />
  </Route>
  <Route path="/changepassword">
    <Newpassword />
  </Route>
  <Route path="/manager-dashboard">
    <Managerdashboard />
  </Route>
  <Route path="/employee-dashboard">
    <Employeedashboard />
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
</Router>

