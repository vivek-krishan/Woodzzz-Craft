import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate({
      path: "products.productId",
      // select: "name",
    })
    .populate({
      path: "user",
      select: "fullName address",
    });
  res.status(201).json(new ApiResponse(201, orders, "Got all orders"));
});

const getCounting = asyncHandler(async (req, res) => {
  const [productsCount, usersCount] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments(),
  ]);

  res
    .status(201)
    .json(
      new ApiResponse(201, { productsCount, usersCount }, "Got the counting")
    );
});

const completeOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) throw new ApiError(400, "Order Id not provided");

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status: "completed" },
    { new: true }
  );
  if (!order) throw new ApiError(404, "Order not found");
  res.status(201).json(new ApiResponse(201, order, "Order completed"));
});

export { getAllOrders, getCounting, completeOrder };
