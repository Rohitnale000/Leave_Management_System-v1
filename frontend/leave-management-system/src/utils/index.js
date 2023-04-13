var validator = require("validator");

//email and password validation
exports.emailAndPassValidation = async (email, password) => {
  if (
    (await validator.isEmail(email)) &&
    (await validator.isStrongPassword(password))
  ) {
    return true;
  } else {
    return false;
  }
};

//birth date validation
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

//validation for create new employee
exports.createEmployeeValidation = (data) => {
  if (validator.isAlpha(data)) {
    return true;
  } else {
    return false;
  }
};

//password  validation
exports.passwordValidation = (pass, cpass) => {
  if (validator.isStrongPassword(pass)) {
    return true;
  } else {
    return false;
  }
};

//contact number validation
exports.phoneNumber = (num) => {
  var phoneno = /^\d{10}$/;
  if (phoneno.test(num)) {
    return true;
  } else {
    return false;
  }
};

//limiting date like min max
exports.limitDateValidation = () => {
  //current date and next date logic
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate());
  let minDate = yesterday.toISOString().split("T")[0];
  return minDate;
};

//only manager email validation validation
exports.emailValidation = (email) => {
  if (validator.isEmail(email)) {
    return true;
  } else {
    return false;
  }
};

exports.passwordAndConformPassValidation = (pass, cpass) => {
  if (validator.equals(pass, cpass)) {
    return true;
  } else {
    return false;
  }
};
