const express = require("express");
const { empLoginData, newPasswordData } = require("../controllers/login");
const router = express.Router();

router.post("/employee/login", empLoginData);

router.patch("/employee/:email", newPasswordData);

module.exports = router;
