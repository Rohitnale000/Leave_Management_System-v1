//import service from services
import {
  applyForLeaveService,
  getEmployeeLeaveService,
  getLeaveApplicationStatusService,
  getSingleEmployeeService,
  profileUpdateService,
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
      console.log(id);
      //send that form field to services for post
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
}
