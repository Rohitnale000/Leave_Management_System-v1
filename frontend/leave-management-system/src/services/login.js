exports.loginService = async (email, password) => {
  try {
    const res = await fetch("http://localhost:3000/employee/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_id: email,
        emp_password: password,
      }),
    });
    const response = await res.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  } // console.log( await emailId);
  // console.log( await password);
};


exports.changePassService = async (email, password) => {
  try {
    console.log(await email);
    const res = await fetch(`http://localhost:3000/employee/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_password: password,
      }),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log("error in fetching API...");
  }
};
