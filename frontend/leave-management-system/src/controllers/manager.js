// import {checkName} from "../utils/index";
import { createEmpService } from "../services/manager";

export default class createEmployee {
  async getFormdata(formfields) {
    if (formfields.firstName.trim() == 0 || formfields.firstName.length == 0){
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
}
