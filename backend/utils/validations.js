var validator = require("validator");

//for login email and password validation
exports.emailAndPassValidation = (email, password) => {
  if (validator.isEmail(email) && validator.isStrongPassword(password)) {
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

exports.emailValidation = (email) => {
  if (!validator.isEmpty(email)) {
    return true;
  } else {
    return false;
  }
};

exports.reasonForDelete = (deleteReason) => {
  console.log(deleteReason);
  if (!validator.isEmpty(deleteReason.reason_for_delete)) {
    return true;
  } else {
    return false;
  }
};

exports.validationForMyprofile = (bodyData) => {
  if (
    !validator.isEmpty(
      bodyData.first_name &&
        bodyData.last_name &&
        bodyData.date_of_birth &&
        bodyData.gender &&
        bodyData.contact_no &&
        bodyData.email_id
    ) &&
    validator.isEmail(bodyData.email_id) &&
    validator.isAlpha(bodyData.first_name) &&
    validator.isAlpha(bodyData.last_name)
  ) {
    return true;
  } else {
    return false;
  }
};

exports.isValidDateOfBirth = (dateString) => {
  // Check if dateString is in the format of "YYYY-MM-DD"
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }
  // to create a Date object with the dateString
  const dob = new Date(dateString);
  // Check if the Date object is valid
  if (!(dob instanceof Date) || isNaN(dob)) {
    return false;
  }
  // Check if the date of birth is in a reasonable range
  const now = new Date();
  if (
    dob > now ||
    dob < new Date(now.getFullYear() - 120, now.getMonth(), now.getDate())
  ) {
    return false;
  }
  // Check if the person is at least 18 years old
  const eighteenYearsAgo = new Date(
    now.getFullYear() - 18,
    now.getMonth(),
    now.getDate()
  );
  if (dob > eighteenYearsAgo) {
    return false;
  }
  return true;
};

exports.phoneNumber = (num) => {
  var phoneno = /^\d{10}$/;
  if (phoneno.test(num)) {
    return true;
  } else {
    return false;
  }
};

exports.otherFieldValidation = (bodyData) => {
  if (
    !validator.isEmpty(bodyData.type_of_leave) &&
    !validator.isEmpty(bodyData.type_of_day) &&
    !validator.isEmpty(bodyData.from_date) &&
    !validator.isEmpty(bodyData.to_date)
  ) {
    return true;
  } else {
    return false;
  }
};

exports.passwordValidation = (oldPass, newPass) => {
  if (
    validator.isStrongPassword(oldPass) &&
    validator.isStrongPassword(newPass)
  ) {
    return true;
  } else {
    return false;
  }
};
