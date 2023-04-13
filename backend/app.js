const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
app.use(cors());

require("./models/connection.js");
const bodyParser = require("body-parser");

//login router requried
const loginRoute = require("./routes/login.js");
//employee router
const employeeRouter = require("./routes/employee.js");
//leave application router
const leaveAppRouter = require("./routes/leave-application.js");
//leave-type router
const leaveTypeRouter = require("./routes/leave-type");
//manager router
const managerRouter = require("./routes/manager.js");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
//login router
app.use("/", loginRoute);
//employee router
app.use("/", employeeRouter);
//leave application router
app.use("/", leaveAppRouter);

//leave-type router
app.use("/", leaveTypeRouter);

//manager router
app.use("/", managerRouter);

dotenv.config({ path: "./config" + "/.env" });
app.listen(process.env.PORT, () => {
  console.log(`server is running on port number..${process.env.PORT}`);
});
