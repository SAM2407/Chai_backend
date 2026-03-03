import mongoose from "mongoose";
// import { DB_NAME } from "../constant.js";




// const connectDB = async () => {
//     try{
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
//     }
//     catch(error){
//         console.log("MONGO DB CONNECTION ERROR: ", error);
//         process.exit(1); // Exit the process with failure 
//     }
//     console.log("MONGODB_URI:", process.env.MONGODB_URI);
// }
// export default connectDB;import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("ENV URI:", process.env.MONGODB_URI);

    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGO DB CONNECTION ERROR:", error);
    process.exit(1);
  }
};

export default connectDB;
