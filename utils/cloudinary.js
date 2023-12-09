import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { CLOUDINARY_FOLDER_NAME } from '../constant.js';

/**
 * Configures the Cloudinary SDK with the provided credentials from environment variables.
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadImage = async (imagePath) => {
    try {
        if (!imagePath) {
            console.log("Image path is required !!!");
            return null;
        }

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(imagePath, {
            folder: CLOUDINARY_FOLDER_NAME,
            resource_type: "image",
        });

        console.log("IMAGE UPLOADED SUCCESSFULLY :: ", uploadResponse.url);
        return uploadResponse.url;
    }
    catch (error) {
        console.log("IMAGE UPLOAD FAILED :: ", error);
        throw error;
    }
    finally {
        // Remove the locally saved temporary file regardless of the upload result
        fs.unlinkSync(imagePath);
    }
}

export {
    uploadImage
};
