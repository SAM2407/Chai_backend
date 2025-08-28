import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// Define the schema for the User model
const userSchema = new Schema({
  // Username field: must be unique, trimmed, and stored in lowercase
  Username: {
    type: String,             // Data type is String
    required: true,           // Field is mandatory
    unique: true,             // No two users can have the same username
    trim: true,               // Removes whitespace from both ends
    index: true,              // Makes searching faster
    lowercase: true,          // Converts value to lowercase before saving
  },

  // Email field: same constraints as Username
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
    lowercase: true,
  },

  // Full name of the user
  fullname: {
    type: String,
    required: true,
    trim: true,
    index: true,              // Useful if you want to search users by name
  },

  // Avatar image URL (usually from Cloudinary or similar service)
  avatar: {
    type: String,
    required: true,           // Every user must have a profile picture
  },

  // Optional cover image URL
  coverImage: {
    type: String,             // Not required, so users can skip it
  },

  // Watch history: stores references to Video documents
  watchHistory: [
    {
      type: mongoose.Schema.Types.ObjectId, // Each entry is a reference ID
      ref: "Video",                         // Refers to the Video model
    },
  ],

  // Password field: required and validated with a custom message
  password: {
    type: String,
    required: [true, "password is required"], // Custom error message
  },

  // Refresh token for session management (optional)
  refreshToken: {
    type: String,
  },
}, {
  // Automatically adds createdAt and updatedAt timestamps
  timestamps: true,
});
userSchema.pre("save",async function(next){
  if(!this.isModified(this.password)) return next();

  this.password = bcrypt.hash(this.password,10)
  next()
})
userSchema.methods.ispasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}
  userSchema.methods.genrateAccessToken = function(){
    return jwt.sign(
      {
      _id:this._id,
      email:this.email,
      Username:this.Username,
      fullname:this.fullname

       },
    process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
    )
  }
    userSchema.methods.genrateRefreshToken = function(){
      return jwt.sign(
        {
          _id:this._id
        },
            process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }

      )
    }

// Create and export the User model
export const User = mongoose.model("User", userSchema);