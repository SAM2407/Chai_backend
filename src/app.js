// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"
// import e from "express"

// const app = express()
// app.use(cros({
//     origin:process.env.CORS_ORIGIN // This should be set to the frontend URL
//     ,credentials:true // This allows cookies to be sent with requests

// }))

//  //form se aaye hue data k liye hia ye
//  app.use(express.json({limit:"16kb"})) // Increase the limit to 50mb
//  //It is for data coming from uri and form data
//  //like form data and url encoded data
//  app.use(express.urlencoded({extended:true,limit:"16kb"})) // Increase the limit to 50mb
//  app.use(express.static("public")) //to serve static files from public folder like images, css, js files
//  //cookie parser to parse the cookies we can also perfrom curd operaton on users cookies
 
// app.use(cookieParser())

// //we write some routes here or import here 
// import userRouter from "./routes/user.routes.js"
// app.use("/users",userRouter) // This means that all routes defined in userRouter will be prefixed with /users
// //if we are defining any api then we have to tell here about 
// // that api and its route and controller function
// //app.use("api/v1/users",userRouter) 
// // // This means that all routes defined in userRouter will be 
// // prefixed with /api/v1/users


// export default app;
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";

const app = express();

/* -------------------- MIDDLEWARES -------------------- */

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Static Files
app.use(express.static("public"));

// Cookie Parser
app.use(cookieParser());

/* -------------------- ROUTES -------------------- */

app.use("/users", userRouter);

/* ------------------------------------------------ */

export default app;