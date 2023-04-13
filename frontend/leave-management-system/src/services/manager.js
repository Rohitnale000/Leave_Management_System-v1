exports.createEmpService = async (formfields) => {
  console.log(formfields);
  try {
    const url = "http://localhost:3000/employee";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formfields.firstName,
        last_name: formfields.lastName,
        gender: formfields.gender,
        date_of_birth: formfields.dateOfBirth,
        email_id: formfields.emailId,
        emp_password: formfields.password,
        contact_no: formfields.contactNo,
        department: formfields.department,
        designation: formfields.designation,
        joining_date: formfields.joiningDate,
        emp_role: formfields.role,
        reporting_manager_email: formfields.reportingManager,
      }),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

exports.leaveApplicationsListService = async (email) => {
  try {
    const url = `http://localhost:3000/${email}/leave?page=1&limit=8`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleLeaveApplicationService = async (id) => {
  try {
    const url = `http://localhost:3000/leave-application/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};

exports.searchLeaveApplicationService = async (leaveStatus, email) => {
  try {
    const url = `http://localhost:3000/leave?data=${leaveStatus}&manEmail=${email}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};

exports.rejectLeaveApplicationService = async (appId, empId) => {
  try {
    const url = `http://localhost:3000/leave/${appId}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        emp_id: empId,
      }),
    });
    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};
// exports.employeeListService = async (email, page) => {
//   console.log(email);
//   console.log(page);
//   try {
//     const res = await fetch(
//       `http://localhost:3000/${email}/employee?page=${page}&limit=3`,
//       {
//         method: "GET",
//         headers: { "content-type": "application/json" },
//       }
//     );
//     const listData = await res.json();
//     console.log(listData, "res from service employeelist");
//     return listData;
//   } catch (e) {
//     console.log("error pagination..");
//   }
// };
// exports.pendingListService = async (email, page) => {
//   console.log(email);
//   console.log(page);
//   try {
//     // const pendingList = await fetch(``)
//   } catch (e) {}
// };
