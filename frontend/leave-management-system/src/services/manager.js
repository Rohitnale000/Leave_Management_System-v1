exports.createEmpService = async (formfields)=>{
    console.log(formfields)
    try {
        const res = await fetch("http://localhost:3000/employee", {
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
            reporting_manager_email: formfields.reportingManager
          }),
        });
        const response = await res.json();
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      } // console.log( await emailId);
      // console.log( await password);
    }
