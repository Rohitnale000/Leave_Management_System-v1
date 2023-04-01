exports.dataFormatting = (data) => {
  let arr = [];
  let getEmployee;

  for (let i = 0; i < data.length; i++) {
    getEmployee = data[i];

    let responseObj = {
      emp_id: getEmployee.emp_id,
      first_name: getEmployee.first_name,
      last_name: getEmployee.last_name,
      email_id: getEmployee.email_id,
      contact_no: getEmployee.contact_no,
      department: getEmployee.department,
      designation: getEmployee.designation,
      joining_date: getEmployee.joining_date,
      emp_role: getEmployee.emp_role,
      reporting_manager_email: getEmployee.reporting_manager_email,
    };

    arr.push(responseObj);
  }

  return arr;
};

exports.fromatingEmployeeData = (data) => {
 console.log(data);
  // let storeArray = [];

  //  for (let i = 0; i < data.length; i++) {
  
  //     storeArray.push({
  //       emp_id: data[i].emp_id,
  //       first_name: data[i].first_name,
  //       last_name: data[i].last_name,
  //       contact_no: data[i].contact_no,
  //       app_id: data[i].leave_applications[0].app_id,
  //       from_date: data[i].leave_applications[0].from_date,
  //       to_date: data[i].leave_applications[0].to_date,
  //       type_of_leave: data[i].leave_applications[0].type_of_leave,
  //       type_of_day: data[i].leave_applications[0].type_of_day,
  //       reason: data[i].leave_applications[0].reason,
  //       leave_status: data[i].leave_applications[0].leave_status,
  //       applied_date: data[i].leave_applications[0].applied_date,
  //       no_of_leave: data[i].leave_applications[0].no_of_leave,
  //       reporting_manager_email:
  //         data[i].leave_applications[0].reporting_manager_email,
  //     });
  //  }
  //console.log(storeArray);
  //return storeArray;
};
