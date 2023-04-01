var validator = require("validator");

//for login email and password validation
exports.emailAndPassValidation = (email, password) => {
  var regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex) && password.match(regularExpression)) {
    return true;
  } else {
    return false;
  }
};

exports.allFieldValidation = (bodyData) => {
  console.log(bodyData);
  if (
    !validator.isEmpty(
      bodyData.first_name &&
        bodyData.last_name &&
        bodyData.date_of_birth &&
        bodyData.gender &&
        bodyData.contact_no &&
        bodyData.department &&
        bodyData.designation &&
        bodyData.joining_date &&
        bodyData.emp_role &&
        bodyData.emp_password
    )
  ) {
    return true;
  } else {
    return false;
  }
};


exports.emailValidation= (email)=>{
  if(!validator.isEmpty(email)){
    return true
  }else{
    return false
  }
}

exports.reasonForDelete=(deleteReason)=>{
  console.log(deleteReason);
  if (!validator.isEmpty(deleteReason.reason_for_delete)){
      return true
    }else{
      return false
    }
}