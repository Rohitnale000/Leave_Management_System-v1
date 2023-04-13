// import {checkName} from "../utils/index";
import {
  createEmpService,
  employeeListService,
  getSingleLeaveApplicationService,
  leaveApplicationsListService,
  rejectLeaveApplicationService,
  searchLeaveApplicationService,
} from "../services/manager";
import {
  createEmployeeValidation,
  emailAndPassValidation,
  emailValidation,
  isValidDateOfBirth,
  passwordAndConformPassValidation,
  phoneNumber,
} from "../utils";

export default class createEmployee {
  async getFormData(formData) {
    try {
      //const validationResult = createEmployeeValidation(formData.firstName);
      const validationResult1 = isValidDateOfBirth(formData.dateOfBirth);
      const validationResult2 = await emailAndPassValidation(
        formData.emailId,
        formData.password
      );
      const validationResult3 = passwordAndConformPassValidation(
        formData.password,
        formData.confirmPassword
      );
      const validationResult4 = phoneNumber(formData.contactNo);
      const validationResult5 = emailValidation(formData.reportingManager);

      if (
        createEmployeeValidation(formData.firstName) &&
        createEmployeeValidation(formData.lastName) &&
        createEmployeeValidation(formData.gender) &&
        createEmployeeValidation(formData.department) &&
        createEmployeeValidation(formData.designation) &&
        validationResult1 &&
        validationResult2 &&
        validationResult3 &&
        validationResult4 &&
        validationResult5
      ) {
        const result = createEmpService(formData);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getLeaveApplications(email) {
    try {
      const result = leaveApplicationsListService(email);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleLeaveApplication(id) {
    try {
      const result = getSingleLeaveApplicationService(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async searchLeaveApplication(leaveStatus, email) {
    try {
      const result = await searchLeaveApplicationService(leaveStatus, email);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async rejectLeaveApplication(appId, empId) {
    try {
      const result = await rejectLeaveApplicationService(appId, empId);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // async getEmployeeList(email, page) {
  //   console.log(page, email);
  //   try {
  //     const list = await employeeListService(email, page);
  //     console.log(list);
  //     return list;
  //   } catch (e) {
  //     console.log("error in pageination controller");
  //   }
  // }
}
