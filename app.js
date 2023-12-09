import express from "express";
import engine from "ejs-mate";
import path from "path";
// const session = require("express-session");
import session from "express-session";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import { dirname } from "path";
import expressSession from "express-session";
// const flash = require("connect-flash");
import flash from "connect-flash";
// import flash from "express-flash-message";
// import flash from "connect-flash";
// Get the current module's filename and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Create an Express application
const app = express();

// Configure the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.engine("ejs", engine);

// Middleware setup
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Method override middleware
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "geeksforgeeks",
    saveUninitialized: true,
    resave: true,
  })
);

// app.locals.user = null;
import jwt from "jsonwebtoken";
import { User } from "./models/index.js";

app.use(async (req, res, next) => {
  res.locals.user = null;
  const token = req.headers.cookie?.split("=")[1];
  try {
    if (token) {
      // Verify the token
      const decoded = jwt.verify(token, "process.env.ACCESS_TOKEN_SECRET");
      const id = decoded._id;

      // Retrieve user details excluding sensitive information
      const user = await User.findById(id).select(
        "-password -orders -payments -reviews -products"
      );

      res.locals.user = user;
    }
  } catch (err) {
    // Handle JWT verification errors
    console.error("JWT Verification Error:", err.message);
  }
  next();
});
// routers
import {
  productRouter,
  reviewRouter,
  userRouter,
  cartRouter,
  paymentRouter,
} from "./routes/index.js";

app.use(flash());

app.use(productRouter);
app.use(function (req, res, next) {
  // req.flash("success", "Invalid Username/Password");

  // console.log();
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };

  console.log(res.locals);
  next();
});
app.use("/auth", userRouter);
app.use("/review", reviewRouter);
app.use("/cart", cartRouter);

app.use("/payment", paymentRouter);

export default app;
