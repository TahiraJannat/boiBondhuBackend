require("dotenv").config(); // Activate env variables
const express = require("express");
const cors = require("cors");

const indexRouter = require("./src/routes/home.route");
const userRouter = require("./src/routes/users.route");
const authRouter = require("./src/routes/auth.route");

const app = express();
app.use(cors());

app.use(express.json());

// simple route
app.use("/", indexRouter);
// app.use("/api/user", userRouter);
app.use("/api/auth", userRouter);

const SERVER_PORT = process.env.SERVER_PORT || 3001;

// set port, listen for requests
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
