var validator = require("validator");

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

// var validator = require("validator");

// const checkName =(name)=>{
//   const regex = /^[A-Za-z\s]*$/;
//   if(name.isAlpha == "" || formvalue.lastname.trim() == "" || !formvalue.firstname.match(regex) || !formvalue.lastname.match(regex)){
//     console.log("name is invalid and empty");
//     return false;
//   }else{
//     return true;
//   }
// }

//for login email and password validation
// const emailValidation= (email,password)=>{
//   if(!validator.isEmpty(email) || !validator.isEmpty(password)){
//     return true;
//   }else{
//     return false;
//   }
// }

// const confirmPassword =(password,confirmPassword)=>{
//   if (formvalue.confirmPassword.trim() == ""|| formvalue.confirmPassword.length == 0 ){
//     return false;
//   }
//   if(formvalue.confirmPassword !== formvalue.password ){
//     return false;
//   }
//   return true;
// }

// const checkGender =(gender) =>{
// if(formvalue.gender.trim()==""){
//   return false;
// }
//   return true;
// }

// const handleSubmit =(formvalue)=>{
// if(!checkName() || !checkGender() || !checkPassword() || !confirmPassword()){
//   return false;

// }
// return true;
// }

// export default {emailValidation};
