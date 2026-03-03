import  {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadToCloudinary  =async(localFilePath)=>{
    try{
        if(!localFilePath) return null;
        //upload the file on the cloudinary
       const response  = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        console.log("File uploaded to Cloudinary successfully",response.url);
        return response.url;

    }
    catch(error){
        fs.unlinkSync(localFilePath)//delete the local file after uploading to cloudinary 
        //  or if there is any error druing uploading  to cloudinary 
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    }
}
export {uploadToCloudinary}
