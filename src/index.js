//whenever we try to connect to the database we need to take care of two thinns 
//first is try and catch block to handle the error and second is 
//asynchronous function to connect to the database
// require("dotenv").config();
// import mongoose from "mongoose";
// import { DB_NAME } from "./constant.js";
/*import express from "express";

;(async () => {
    try{
        await   mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`)
        application.on("error", (err) => {
            console.error("Database connection error:", err);
            throw err; // Rethrow the error to handle it in the calling function
        });
        application.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);   
        });
        console.log("Connected to the database successfully");
    } catch(err){
        console.error("Error connecting to the database:", err);
        throw err; // Rethrow the error to handle it in the calling function
    }
})() */
  import dotenv from "dotenv";
   dotenv.config({
    path:'./.env'
  })
  // import connectDB from   "./db/index.js";
 
  // //if we have to use this method then we have to write thid in package.json file
  // //in the script section "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js
  //   //we can also use this method to connect to the database


  // connectDB() 
  // .then(() => {
  //   app.listen(process.env.PORT || 3000, () => {
  //     console.log(`Server is running on port ${process.env.PORT || 3000}`);
  //   });

  // })
  // .catch((error) => {
  //   console.error("Database connection failed:", error);
  //   process.exit(1); // Exit the process with failure
  // });
  
  import connectDB from "./db/index.js";
import app from "./app.js"; // assuming you have express app exported

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

