const express = require("express");
const {
  createLeaveApplicationData,
  getLeaveApplicationsData,
  approveLeaveData,
  rejectLeaveData,
  leaveStatusData,
  searchLeaveData,
} = require("../controllers/leave-application");

const router = express.Router();

router.post("/leave", createLeaveApplicationData);

router.get("/:email/leave", getLeaveApplicationsData);

router.patch("/leave/:id", approveLeaveData);

router.put("/leave/:id", rejectLeaveData);

router.get("/leave/:id", leaveStatusData);

router.get("/leave", searchLeaveData);
module.exports = router;
