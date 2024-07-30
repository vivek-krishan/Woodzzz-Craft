import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  UploadFileToCloudinary,
  DeleteFileFromCloudinary,
} from "../utils/Cloudinary.js";
import { Product } from "../models/product.model.js";

const UploadNewProduct = asyncHandler(async (req, res) => {
  const { productId, name, description, summery, oldPrice, newPrice, rating } =
    req.body;

  console.log(req.body);

  if ([name, description, summery].some((field) => field.trim() === ""))
    throw new ApiError(400, "All fields are required");

  if (!newPrice)
    throw new ApiError(400, "Product price is very important and compulsory");

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

  res
    .status(200)
    .json(
      new ApiResponse(200, createdProduct, "Product Uploaded successfully")
    );
});

const GetProductDetails = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  console.log(req);
  if (!productId)
    throw new ApiError(
      400,
      "product Id isn't found! Please provide product id."
    );

  const product = await Product.findOne({ productId });

  if (!product)
    throw new ApiError(
      400,
      "Product not found! may be due to invalid product Id. Please check and try again"
    );

  res.status(200).json(new ApiResponse(200, product, "Got your product"));
});

const GetAllProducts = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId)
    throw new ApiError(
      400,
      "product Id isn't found! Please provide product id."
    );

  const product = await Product.find({ productId });

  if (!product)
    throw new ApiError(
      400,
      "Product not found! may be due to invalid product Id. Please check and try again"
    );

  res.status(200).json(new ApiResponse(200, product, "Got your product"));
});

const ClearAndUpdateImages = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId)
    throw new ApiError(
      400,
      "product Id isn't found! Please provide product id."
    );

  const product = await Product.findOne({ productId });

  if (!product)
    throw new ApiError(
      400,
      "Product not found! may be due to invalid product Id. Please check and try again"
    );

  if (!req.files || req.files.length === 0)
    throw new ApiError(400, "New Images not found! Please upload the images");

  //---------- Deleting all previous images
  if (product.images.length !== 0) {
    const deletePromises = product.images.map((image) =>
      DeleteFileFromCloudinary(image)
    );
    await Promise.all(deletePromises);
    product.images = [];

    if (product.images.length > 0)
      throw new ApiError(
        500,
        "Failed to delete all images due to server error! Please try again."
      );
  }

  const uploadPromises = req.files.map(async (image) => {
    const UploadedImg = await UploadFileToCloudinary(image.path);
    console.log(image.originalname, " is uploaded");
    product.images.push(UploadedImg.url);
  });

  await Promise.all(uploadPromises);
  await product.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        product,
        "All old images are deleted and new are uploaded "
      )
    );
});

const AddImages = asyncHandler(async (req, res) => {
  const MAX_IMAGES = 5;
  const { productId } = req.params;

  // Validate productId
  if (!productId) {
    throw new ApiError(
      400,
      "Product Id isn't found! Please provide product id."
    );
  }

  // Validate the product existence
  const product = await Product.findOne(productId);
  if (!product) {
    throw new ApiError(
      400,
      "Product not found! May be due to invalid product Id. Please check and try again."
    );
  }

  // Validate the images in request
  const images = req.files;
  if (!images || images.length === 0) {
    throw new ApiError(400, "New Images not found! Please upload the images.");
  }
  if (images.length > MAX_IMAGES - 1) {
    throw new ApiError(
      400,
      `You can upload a maximum of ${MAX_IMAGES} images.`
    );
  }

  // Ensure the total number of images does not exceed MAX_IMAGES
  if (product.images.length + images.length > MAX_IMAGES) {
    throw new ApiError(
      400,
      `Adding these images would exceed the maximum allowed ${MAX_IMAGES} images.`
    );
  }

  // Upload new images
  const uploadPromises = images.map(async (image) => {
    const uploadedImg = await UploadFileToCloudinary(image.path);
    console.log(`${image.originalname} is uploaded`);
    product.images.push(uploadedImg.url);
  });
  await Promise.all(uploadPromises);

  // Save the updated product
  await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, product, "Images added successfully."));
});

const UpdateProductDetails = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { name, description, summery, wasPrice, price, rating } = req.body;

  //   console.log(req);

  if (
    [name, description, summery].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!productId) throw new ApiError(400, "product Id isn't found!");

  console.log("price", price, typeof price);

  if (!price || !rating)
    throw new ApiError(400, " Price and Rating both are required");

  const product = await Product.findOne({ productId });

  if (!product)
    throw new ApiError(
      400,
      "Product not found! may be due to invalid product Id. Please check and try again"
    );

  product.name = name;
  product.description = description;
  product.summery = summery;
  product.price.currentPrice = price;
  product.rating = rating;

  if (wasPrice) product.price.wasPrice = wasPrice;

  await product.save();

  res.status(200).json(new ApiResponse(200, product, "Updation completed"));
});

const DeleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.param;

  if (!productId) throw new ApiError(400, "Product Id not found!");

  const DeletedProduct = await Product.findOneAndDelete(productId);

  if (!DeletedProduct)
    throw new ApiError(500, "failed to delete due to some internal error");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        DeleteProduct,
        "Product deletion completed successfully"
      )
    );
});

export {
  AddImages,
  DeleteProduct,
  GetAllProducts,
  UploadNewProduct,
  GetProductDetails,
  UpdateProductDetails,
  ClearAndUpdateImages,
};
