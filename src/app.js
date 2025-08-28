import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import e from "express"

const app = express()
app.use(cros({
    origin:process.env.CORS_ORIGIN // This should be set to the frontend URL
    ,credentials:true // This allows cookies to be sent with requests

}))

 //form se aaye hue data k liye hia ye
 app.use(express.json({limit:"16kb"})) // Increase the limit to 50mb
 //It is for data coming from uri and form data
 //like form data and url encoded data
 app.use(express.urlencoded({extended:true,limit:"16kb"})) // Increase the limit to 50mb
 app.use(express.static("public")) //to serve static files from public folder like images, css, js files
 //cookie parser to parse the cookies we can also perfrom curd operaton on users cookies
 
app.use(cookieParser())


export{app}