import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
    UploadFileToCloudinary,
    DeleteFileFromCloudinary,
} from "../utils/Cloudinary.js";
import { Product } from "../models/product.model.js";

const UploadNewProduct = asyncHandler(async (req, res) => {
    const {
        productId,
        name,
        description,
        summery,
        oldPrice,
        newPrice,
        rating,
    } = req.body;

    console.log(req.body);

    if ([name, description, summery].some((field) => field.trim() === ""))
        throw new ApiError(400, "All fields are required");

    if (!newPrice)
        throw new ApiError(
            400,
            "Product price is very important and compulsory"
        );

    if (!rating)
        throw new ApiError(
            400,
            "Please provide rating of the product! It is compulsory"
        );

    if (!productId)
        throw new ApiError(400, "Product Id is very important and compulsory");

    const isUploaded = await Product.findOne({ productId });

    if (isUploaded) throw new ApiError(401, "This product is already uploaded");

    const imageLocalFilePath = req.file?.path;

    if (!imageLocalFilePath) throw new ApiError("Product image is Compulsory.");

    const Image = await UploadFileToCloudinary(imageLocalFilePath);

    if (!Image)
        throw new ApiError(
            500,
            "Failed to Upload due to some internal error ! Please try again"
        );

    const newProduct = await Product.create({
        productId,
        name,
        description,
        summery,
        price: {
            wasPrice: oldPrice || null,
            currentPrice: newPrice,
        },
        rating,
        images: [Image.url],
    });

    const createdProduct = await Product.findById(newProduct._id);

    if (!createdProduct)
        throw new ApiError(
            500,
            "Failed to upload product due to internal server error! please try again"
        );

    res.status(200).json(
        new ApiResponse(200, createdProduct, "Product Uploaded successfully")
    );
});

const GetProductDetails = asyncHandler(async (req, res) => {});

const GetAllProducts = asyncHandler(async (req, res) => {});

const ClearAndUpdateImages = asyncHandler(async (req, res) => {});

const AddImages = asyncHandler(async (req, res) => {});

const UpdateProductDetails = asyncHandler(async (req, res) => {});

const DeleteProduct = asyncHandler(async (req, res) => {});

export {
    AddImages,
    DeleteProduct,
    GetAllProducts,
    UploadNewProduct,
    GetProductDetails,
    UpdateProductDetails,
    ClearAndUpdateImages,
};
