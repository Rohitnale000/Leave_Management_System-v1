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

// exports.employeeDataFromatting = (data) => {
//   let arr = [];
//   let getEmployee;

//   for (let i = 0; i < data.length; i++) {
//     getEmployee = data[i];

//     let responseObj = {
//       // emp_id: getEmployee.emp_id,
//       // first_name: getEmployee.first_name,
//       // last_name: getEmployee.last_name,
//       // email_id: getEmployee.email_id,
//       // contact_no: getEmployee.contact_no,
//       // department: getEmployee.department,
//       // designation: getEmployee.designation,
//       // joining_date: getEmployee.joining_date,
//       // emp_role: getEmployee.emp_role,
//       // reporting_manager_email: getEmployee.reporting_manager_email,
//       emp_password: getEmployee.emp_password,
//     };

//     arr.push(responseObj);
//   }

//   return arr;
// };
