const express = require("express");
const { getSingleAppData } = require("../controllers/manager");
const router = express.Router();

router.get("/leave-application/:id", getSingleAppData);
module.exports = router;
