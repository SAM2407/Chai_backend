//how to make router and export it it is an important concept
import {Router} from 'express';
// some code of router we write in a app.js where we 
//import the router and use it in app.js
import {registerUser} from '../controllers/user.contoller.js';
import {upload} from "../middlewares/multer.middleware.js"
const router = Router() // This creates a new instance of the Express Router, which we can use to define our routes.
router.route("/register").post(upload.fields([
    {name:"avatar",maxCount:1},
    {name:"coverImage",maxCount:1}
]),registerUser) // This means that when a POST request is made to /users/register,
//  the registerUser controller function will be called 
 
    





export default router 