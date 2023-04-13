//create service for logic

exports.applyForLeaveService = async (allFormFields) => {
  try {
    const res = await fetch(`http://localhost:3000/leave`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        from_date: allFormFields.fromDate,
        to_date: allFormFields.toDate,
        type_of_leave: allFormFields.typeOfLeave,
        type_of_day: allFormFields.typeOfDay,
        reason: allFormFields.reason,
        emp_id: allFormFields.empId,
        reporting_manager_email: allFormFields.reportingManagerEmail,
      }),
    });
    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};

exports.getEmployeeLeaveService = async (id) => {
  console.log(id);
  try {
    const res = await fetch(`http://localhost:3000/leave-types/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};

exports.getLeaveApplicationStatusService = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/leave/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};

exports.profileUpdateService = async (allFormFields) => {
  console.log(await allFormFields);
  try {
    const res = await fetch(
      `http://localhost:3000/employee/${allFormFields.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          first_name: allFormFields.firstName,
          last_name: allFormFields.lastName,
          gender: allFormFields.gender,
          date_of_birth: allFormFields.dateOfBirth,
          contact_no: allFormFields.contactNo,
          email_id: allFormFields.email,
        }),
      }
    );
    const response = await res.json();
    console.log(response);
    return response;
  } catch (error) {}
};

exports.getSingleEmployeeService = async (id) => {
  console.log(id);
  try {
    const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};

exports.changePasswordService = async (allFormFeilds) => {
  try {
    const res = await fetch(
      `http://localhost:3000/employee/changepassword/${allFormFeilds.id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          old_password: allFormFeilds.oldPassword,
          new_password: allFormFeilds.newPassword,
        }),
      }
    );
    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};

exports.getEmployeeListService = async (email) => {
  try {
    const url = `http://localhost:3000/${email}/employee?page=1&limit=8`;
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

exports.deleteEmployeeService = async (id, reason) => {
  try {
    const url = `http://localhost:3000/employee/${id}`;
    const res = await fetch(url, {
      method: "delete",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reason_for_delete: reason }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

exports.searchEmployeeService = async (email, manEmail) => {
  try {
    const url = `http://localhost:3000/employee?empEmail=${email}&manEmail=${manEmail}`;
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

exports.updateEmployeeByManagerService = async (id, allFormFields) => {
  console.log(allFormFields);
  try {
    const url = `http://localhost:3000/api/employee/${id}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        first_name: allFormFields.firstName,
        last_name: allFormFields.lastName,
        gender: allFormFields.gender,
        date_of_birth: allFormFields.dateOfBirth,
        email_id: allFormFields.email,
        contact_no: allFormFields.contactNo,
        department: allFormFields.department,
        designation: allFormFields.designation,
        joining_date: allFormFields.joiningDate,
        emp_role: allFormFields.role,
        reporting_manager_email: allFormFields.reportingManagerEmail,
      }),
    });
    const response = await res.json();
    return await response;
  } catch (error) {
    console.log(error);
  }
};
