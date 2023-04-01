const checkName =(name)=>{
  const regex = /^[A-Za-z\s]*$/;
  if(formvalue.firstname.trim() == "" || formvalue.lastname.trim() == "" || !formvalue.firstname.match(regex) || !formvalue.lastname.match(regex)){
    console.log("name is invalid and empty");
    return false;
  }else{
    return true;
  }
}

const checkEmail = (email) =>{
   const regex = /^([a-z\d\.\-])@([a-z\d\-])(\.[a-z])(\.[a-z])?$/;
   if(formvalue.emailId.trim() == "" || formvalue.emailId.length == 0 || !formvalue.emailId.match(/^([a-z\d\.\-])@([a-z\d\-])(\.[a-z])(\.[a-z])?$/)){
    return false;
   }
   return true;
}

const checkPassword =(password) =>{
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if(formvalue.password.trim() == "" || formvalue.password.length == 0 || !formvalue.password.match(regex)){
    return false;
  }
  return true;
}

const confirmPassword =(password,confirmPassword)=>{
  if (formvalue.confirmPassword.trim() == ""|| formvalue.confirmPassword.length == 0 ){
    return false;
  }
  if(formvalue.confirmPassword !== formvalue.password ){
    return false;
  }
  return true;
}

const checkGender =(gender) =>{
if(formvalue.gender.trim()==""){
  return false;
}
  return true;
}



const handleSubmit =(formvalue)=>{
if(!checkName() || !checkGender() || !checkPassword() || !confirmPassword()){
  return false;

}
return true;
}


export default {checkName,checkEmail}