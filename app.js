const express = require("express");

const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.listen(3000);

app.use(cookieParser());
// const authRouter = require("./router/authRouter.js");
const userRouter = require("./router/userRouter.js");
const planRouter = require("./router/planRouter.js");
const reviewRouter = require("./router/reviewRouter.js");

// app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/plans", planRouter);
app.use("/reviews", reviewRouter);
let users = ["rahul"];
app.get("/", (req, res) => {
  res.send(users);
});
