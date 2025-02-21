import fs from "fs";
import ApiError from "./ApiError.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRETE,
});

const UploadFileToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const Response = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log(error);
        throw new ApiError(500, `file upload failed, ${error.message}`);
      });

    // const resp = await cloudinary.uploader.fs; // console.log("file uploaded successfully", Response);
    fs.unlinkSync(localFilePath);
    return Response;
  } catch (error) {
    console.log("error :", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const DeleteFileFromCloudinary = async (publicId, type) => {
  if (!publicId) throw new ApiError(400, "file url is important");

  const Response = await cloudinary.api
    .delete_resources([publicId], {
      type: "upload",
      resource_type: type,
    })
    .then(function (result) {
      return result;
    })
    .catch((error) => {
      console.log(error);
      throw new ApiError(500, "file deletion failed");
    });

  return Response;
};

export { UploadFileToCloudinary, DeleteFileFromCloudinary };
