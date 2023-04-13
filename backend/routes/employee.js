const express = require("express");
const {
  createNewEmployeeData,
  updateEmployeeData,
  searchEmployeeData,
  employeePaginationData,
  updateEmployeeDetailData,
  deleteEmployeeData,
  changePasswordData,
  getSingleEmployeeData,
} = require("../controllers/employee");
const router = express.Router();

router.post("/employee", createNewEmployeeData);

router.put("/employee/:id", updateEmployeeData);

router.get("/employee", searchEmployeeData);

router.get("/:email/employee", employeePaginationData);

router.patch("/api/employee/:id", updateEmployeeDetailData);

//for delete employee
router.delete("/employee/:id", deleteEmployeeData);

router.patch("/employee/changepassword/:id", changePasswordData);

router.get("/api/employee/:id", getSingleEmployeeData);

module.exports = router;
