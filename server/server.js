const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const bookRouter = require("./routers/bookRouter");
const authRouter = require("./routers/authRouter");
const shelvesRouter = require("./routers/shelvesRouter");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  const index = path.join(__dirname, "../index.html");
  console.log("getting file from root", index);
  return res.status(200).sendFile(index);
});

app.use("/books", bookRouter);
app.use("/auth", authRouter);
app.use("/shelves", shelvesRouter);

// serve static pages
app.use(express.static(path.join(__dirname, "../build")));
app.use("/build", express.static(path.join(__dirname, "../build")));

// Fallback route since using React Router
app.get("*", (req, res) => {
  const index = path.join(__dirname, "../index.html");
  console.log("getting file from fallback", index);

  return res.status(200).sendFile(index);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "an error occured" }
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message);
});

app.listen(3000, () => console.log("Server listening on 3000"));
