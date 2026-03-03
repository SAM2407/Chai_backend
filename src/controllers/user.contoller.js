import asyncHandler from "express-async-handler";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import{uploadToCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
     //get user details from frontend
     //validation of user details like not empty
     //check if user already exists in database:from email or username
     //if user exists send error response
     //if user does not exist create new user in database
     //check for images and avatar and upload to cloudinary
     //  and get the url of the image
     //create user object - create entry in db
     //remove password an refresh toker field from response
     //check for user creation success and send resposnse to frontend
     
   const { fullName, email,username, password } = req.body || {};
    console.log(fullName,email,username,password);

    // if(fullName === " "){
    //   throw new ApiError("fullName is required",400);
    // }
    if(
      [fullName,email,password].some((field)=>
      field?.trim()==="")
    )
    {
      throw new ApiError("All fields are required",400);
    }
    const existedUser= await User.findOne({
      $or:[{username} , {email}]
     })
     
     if(existedUser){
      throw new ApiError("User already exists",409);
     }
     //handling image and avatar to upload to cloudinary and get the url of the image
     // const avatarUrl= await uploadToCloudinary(avatar);
     //create user object and create entry in db
     const avatarLocalPath = req.files?.avatar[0]?.path ;
    const coverImageLocalPath =  req.files?.coverImage[0]?.path;
    if(avatarLocalPath){
      throw new ApiError("Avatar is required:",400);
    }
    //for uploading avatar to cloudinary and get the url of the image
    const avatarUrl = await uploadToCloudinary(avatarLocalPath)
    //for uploading cover image to cloudinary and get the url of the image
    const coverImageUrl = await uploadToCloudinary(coverImageLocalPath)
    //create user object and create entry in db
    if(!avatarUrl){
      throw new ApiError("Avatar is required",400);
    }
   const user = await  User.create({
      fullName,
      avatar:avatarUrl,
      coverImage:coverImageUrl || "",
      email,
      username:username.toLowerCase(),
      password
    })
    const usercheck = await User.findById(user._id).select(
      "-password -refreshToken"
    )
    if(!usercheck){
      throw new ApiError("USer creation failed ",500);
    }
    return res.status(201).json(
      new ApiResponse(200,usercheck,"User created successfully")
    )
    








} )
//use thunderclient to test the api 
// and see the response in postman or thunderclient
// we can also use postman to test the api and 
// see the response in postman or thunderclient



export {registerUser} 