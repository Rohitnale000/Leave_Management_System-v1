const express = require("express");
const { createNewEmployeeData, updateEmployeeData, searchEmployeeData, employeePaginationData, updateEmployeeDetailData, deleteEmployeeData } = require("../controllers/employee");
const router = express.Router();

router.post("/employee",createNewEmployeeData)

router.put("/employee/:id",updateEmployeeData)

router.get("/employee/:email",searchEmployeeData)

router.get("/:email/employee",employeePaginationData)

router.patch("/api/employee/:id",updateEmployeeDetailData)

//for delete employee
router.delete("/employee/:id",deleteEmployeeData)

module.exports=router