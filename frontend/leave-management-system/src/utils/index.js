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
