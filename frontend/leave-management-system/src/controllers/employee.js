//import service from services
import {
  applyForLeaveService,
  changePasswordService,
  deleteEmployeeService,
  getEmployeeLeaveService,
  getEmployeeListService,
  getLeaveApplicationStatusService,
  getSingleEmployeeService,
  profileUpdateService,
  searchEmployeeService,
  updateEmployeeByManagerService,
} from "../services/employee";

export default class ApplyForLeave {
  //store parameters into method
  async getFormData(allFormFeilds) {
    try {
      //send that form field to services for post
      const result = await applyForLeaveService(allFormFeilds);
      return await result;
    } catch (error) {
      console.log(error);
    }
  }

  async setLoginId(id) {
    try {
      const result = await getEmployeeLeaveService(id);
      return await result;
    } catch (error) {
      console.log(error);
    }
  }

  async sendLoginId(id) {
    try {
      const result = await getLeaveApplicationStatusService(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getDataFromMyProfile(allFormFields) {
    console.log(await allFormFields);
    try {
      const result = await profileUpdateService(allFormFields);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeData(id) {
    try {
      const result = await getSingleEmployeeService(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(allFormFeilds) {
    try {
      const result = await changePasswordService(allFormFeilds);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeList(email) {
    try {
      const result = await getEmployeeListService(email);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteEmployee(id, reason) {
    try {
      const result = await deleteEmployeeService(id, reason);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async searchEmployee(email, manEmail) {
    try {
      const result = await searchEmployeeService(email, manEmail);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateEmployee(id, data) {
    try {
      const result = await updateEmployeeByManagerService(id, data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
