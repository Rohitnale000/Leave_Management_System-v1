// import {checkName} from "../utils/index";
import { createEmpService, employeeListService } from "../services/manager";
export default class createEmployee {
  async getFormdata(formfields) {
    if (formfields.firstName.trim() == 0 || formfields.firstName.length == 0) {
      return 0;
    } else {
      try {
        console.log(formfields);
        const data = await createEmpService(formfields);
        //console.log(data);
        return data;
      } catch (e) {
        console.log("error fetching data/");
      }
    }
  }
  async getEmployeeList(email, page) {
    console.log(page, email);
    try {
      const list = await employeeListService(email, page);
      console.log(list);
      return list;
    } catch (e) {
      console.log("error in pageination controller");
    }
  }
  async getPendinglist(email, page) {
    console.log(email, page);
    try {
      const list = await pendingListService(email, page);
      console.log(list);
    } catch (e) {}
  }
}
