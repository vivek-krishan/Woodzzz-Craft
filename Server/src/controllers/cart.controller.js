import { Like } from "../models/like.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { UploadImages } from "../utils/imageKit.io.js";

const AddToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found");
  if (!req.user) throw new ApiError(401, "Please login to add to cart");

  const product = await Product.findOne({ productId });

  if (!product) throw new ApiError(404, "Product Not found");

  const cartItem = await Cart.findOne({
    user: req.user._id,
    cartProduct: product._id,
  });

  if (cartItem) {
    cartItem.quantity += 1;
    await cartItem.save();
    const populatedCartItem = await cartItem.populate("cartProduct"); // Populate product details
    return res
      .status(200)
      .json(new ApiResponse(200, populatedCartItem, "Added successfully"));
  }

  let customizationData = {};
  if (product.customization.status) {
    if (product.customization.customizationType === "text") {
      customizationData = { data: req.body.data };
      console.log(req.body);
      if (!customizationData.data)
        throw new ApiError(404, "Customization data is required!");
    } else if (product.customization.customizationType === "image") {
      const imageFile = req.file;
      console.log(req.file);
      if (!imageFile)
        throw new ApiError(404, "Customization Image file not found!");

      Image = await UploadImages(
        imageFile.filename,
        {
          root: "woodz-craft",
          name: `${product.name.split(" ").join("-")}/${req.user.fullName.split(" ").join("-")}-customization`,
        },
        [req.user.fullName]
      );

      if (!Image)
        throw new ApiError(500, "Failed to upload the customization file");

      customizationData = {
        data: Image.url,
        fileId: Image.fileId,
      };
    }

    await product.save();
  }

  const newCartItem = await Cart.create({
    user: req.user._id,
    cartProduct: product._id,
    customization: customizationData,
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

const SubtractFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found");

  const product = await Product.findOne({
    productId,
  });

  if (!product) throw new ApiError(404, "Product Not found");

  const cartItem = await Cart.findOne({
    user: req.user._id,
    cartProduct: product._id,
  });

  if (!cartItem) {
    throw new ApiError(404, "Item not found in cart");
  }

  if (cartItem.quantity === 1) {
    await cartItem.remove();
    return res
      .status(200)
      .json(new ApiResponse(200, cartItem, "Removed successfully"));
  }

  cartItem.quantity -= 1;
  await cartItem.save();
  const populatedCartItem = await cartItem.populate("cartProduct"); // Populate product details
  return res
    .status(200)
    .json(new ApiResponse(200, populatedCartItem, "Subtracted successfully"));
});

const DeleteFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found");

  const product = await Product.findOne({ productId });

  if (!product) throw new ApiError(404, "Product Not found");

  const deletedItem = await Cart.findOneAndDelete({
    cartProduct: product._id,
    user: req.user._id,
  });

  console.log(deletedItem);

  if (!deletedItem)
    throw new ApiError(
      500,
      "Failed in deleting item from cart due to internal error ! Please try again"
    );

  // Removing cart item from user's Cart section
  const user = await User.findById(req.user._id);
  const index = user.cart.findIndex(
    (item) => item.toString() === deletedItem._id.toString()
  );

  if (index !== -1) {
    user.cart.splice(index, 1); // Remove the item at the found index
    await user.save();
  } else {
    console.log("Item not found in the cart.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedItem, "Deleted successfully"));
});

const IsAddedToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) throw new ApiError(400, "Product Id not found!");

  const product = await Product.findOne({ productId });

  if (!product) throw new ApiError(404, "Product Not found");

  const cartItem = await Cart.findOne({
    cartProduct: product._id,
    user: req.user._id,
  });

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
    user: req.user._id,
  });

  if (!deletedItem)
    throw new ApiError(
      500,
      "Failed in deleting item from wishlist due to internal error ! Please try again"
    );

  // deleting liked item from user's likedProduct section
  const user = await User.findById(req.user._id);
  const index = user.likedProduct.findIndex(
    (item) => item.toString() === deletedItem._id.toString()
  );
  console.log({ index });
  user.likedProduct.splice(index);
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, deletedItem, "removed successfully"));
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
    user: req.user._id,
  });

  if (!likedProduct) return res.status(200).json(new ApiResponse(200, false));
  else return res.status(200).json(new ApiResponse(200, true));
});

const GetWishlist = asyncHandler(async (req, res) => {
  const likedItems = await Like.find({ user: req.user._id }).populate(
    "likedProduct"
  );

  if (!likedItems) {
    return res.status(404).json({ message: "No Liked items found!" });
  }

  res.status(200).json(new ApiResponse(200, likedItems, "Got your wishlist"));
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
  getCartProducts,
  SubtractFromCart,
  DeleteFromWishlist,
};
