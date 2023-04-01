const express = require("express");
const { leaveHistoryData } = require("../controllers/leave-type");
const router = express.Router();


router.get("/leave-types/:id",leaveHistoryData)

module.exports=router