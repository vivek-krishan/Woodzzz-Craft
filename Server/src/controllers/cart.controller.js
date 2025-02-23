import { Like } from "../models/like.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";

const AddToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found");

  const product = await Product.findOne({ productId });

  if (!product) throw new ApiError(404, "Product Not found");

  const cartItem = await Cart.findOne({ cartProduct: product._id });

  if (cartItem) {
    cartItem.quantity += 1;
    await cartItem.save();
    return res
      .status(200)
      .json(new ApiResponse(200, cartItem, "Added successfully"));
  }

  const newCartItem = await Cart.create({
    user: req.user._id,
    cartProduct: product._id,
  });

  const createdCart = await Cart.findById(newCartItem._id);

  if (!createdCart)
    throw new ApiError(
      500,
      "Failed in adding item into cart due to internal error ! Please try again"
    );

  // Adding cart item to user's Cart section
  const user = await User.findById(req.user._id);
  user.cart.push(createdCart._id);
  await user.save();

  res.status(200).json(new ApiResponse(200, createdCart, "Added successfully"));
});

const DeleteFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found");

  const product = await Product.findOne({ productId });

  if (!product) throw new ApiError(404, "Product Not found");

  const deletedItem = await Cart.findOneAndDelete({
    cartProduct: product._id,
  });

  if (deletedItem)
    throw new ApiError(
      500,
      "Failed in deleting item from cart due to internal error ! Please try again"
    );

  // Adding cart item to user's Cart section
  const user = await User.findById(req.user._id);
  const index = user.cart.findIndex(deletedItem._id);
  user.cart.splice(index);
  await user.save();

  res.status(200).json(new ApiResponse(200, deletedItem, "Added successfully"));
});

const IsAddedToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found!");

  const product = await Product.findOne({ productId });

  if (!product) throw new ApiError(404, "Product Not found");

  const cartItem = await Cart.findOne({ cartProduct: product._id });

  if (!cartItem) return res.status(200).json(new ApiResponse(200, false));
  else return res.status(200).json(new ApiResponse(200, true));
});

const GetCart = asyncHandler(async (req, res) => {
  const cartItems = await Cart.find({ user: req.user._id }).populate(
    "cartProduct"
  );

  if (!cartItems) {
    return res.status(404).json({ message: "No cart items found" });
  }

  res.status(200).json(new ApiResponse(200, cartItems, "Got the cart"));
});

const AddToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found");

  const product = await Product.findOne({ productId });

  if (!product) throw new ApiError(404, "Product Not found");

  const newLikedProduct = await Like.create({
    user: req.user._id,
    likedProduct: product._id,
  });

  const createdLikedCard = await Like.findById(newLikedProduct._id);

  console.log("newLikedProduct", newLikedProduct);
  console.log("createdLikedCard", createdLikedCard);
  if (!createdLikedCard)
    throw new ApiError(
      500,
      "Failed in adding item into cart due to internal error ! Please try again"
    );

  // Adding cart item to user's Cart section
  const user = await User.findById(req.user._id);
  user.likedProduct.push(createdLikedCard._id);
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, createdLikedCard, "Added successfully"));
});

const DeleteFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found");

  const product = await Product.findOne({ productId });

  if (!product) throw new ApiError(404, "Product Not found");

  const deletedItem = await Like.findOneAndDelete({
    likedProduct: product._id,
  });

  if (!deletedItem)
    throw new ApiError(
      500,
      "Failed in deleting item from wishlist due to internal error ! Please try again"
    );

  // deleting liked item from user's likedProduct section
  const user = await User.findById(req.user._id);
  const index = user.likedProduct.findIndex(deletedItem._id);
  user.likedProduct.splice(index);
  await user.save();

  res.status(200).json(new ApiResponse(200, deletedItem, "Added successfully"));
});

const CheckIfLiked = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found!");

  const product = await Product.findOne({
    productId,
  });

  if (!product) throw new ApiError(404, "Product Not found");

  const likedProduct = await Like.findOne({
    likedProduct: product._id,
  });

  if (!likedProduct) return res.status(200).json(new ApiResponse(200, false));
  else return res.status(200).json(new ApiResponse(200, true));
});

const GetWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req._id).populate("likedProduct");

  if (!user)
    throw ApiError(
      500,
      "failed to find due to internal error! Please try again"
    );

  res.status(200).json(new ApiResponse(200, user, "Got the cart"));
});

const getCartProducts = asyncHandler(async (req, res) => {
  const { userId } = req.params; // Get userId from the URL parameter

  try {
    // Find the user and populate the CartProducts field
    const user = await User.findById(userId).populate("Cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the cart products
    return res.status(200).json({ success: true, data: Cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export {
  GetCart,
  AddToCart,
  GetWishlist,
  CheckIfLiked,
  IsAddedToCart,
  AddToWishlist,
  DeleteFromCart,
  DeleteFromWishlist,
  getCartProducts,
};
