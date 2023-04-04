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
