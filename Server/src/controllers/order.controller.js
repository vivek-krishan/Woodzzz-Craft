import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import SendMail from "../utils/Nodemailer.js";
import { OrderConformation } from "../utils/Email.UI.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";

const CreateOrder = asyncHandler(async (req, res) => {
  const { totalPrice } = req.body;

  if (!totalPrice) throw new ApiError(404, "Please provide a total price");

  const user = await User.findById(req.user._id).populate("cart");
  if (!user) throw new ApiError(401, "User is not authenticated!");

  if (user.cart.length === 0) throw new ApiError(404, "Cart is empty");
  const products = user.cart.map((item) => ({
    productId: item.cartProduct,
    quantity: item.quantity,
  }));

  const order = await Order.create({
    user: user._id,
    products: products,
    totalPrice,
  });

  if (!order)
    throw new ApiError(
      404,
      "Failed to create order due to some internal error! Please try again later."
    );

  // this address is for sending user from mail.
  const UserAddress = [
    `${user.address.street}, ${user.address.city}`,
    `${user.address.state}, ${user.address.country}`,
    `${user.address.pinCode}`,
  ];

  // Finding products for sending user via mail
  const orderedProducts = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.productId, {
        name: 1,
        images: { $slice: 1 },
      });

      if (!product) return null; // Skip if the product is not found

      return {
        name: product.name,
        image: product.images[0] || "", // Handle empty image array
        quantity: item.quantity,
      };
    })
  );

  // Clearing the user's cart because order is placed against all the cart products.
  user.cart = [];
  user.orderHistory.push(order._id);
  await user.save();

  await Cart.deleteMany({ user: user._id });

  // Send email to user about the order
  // await SendMail(
  //   user.email,
  //   "Order placed successfully",
  //   "Order Conformation",
  //   OrderConformation(user.fullName, order._id, UserAddress, orderedProducts)
  // );

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order Placed successfully 😊"));
});

const GetOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) throw new ApiError(400, "Order Id not provided");

  const order = await Order.findById(orderId).populate("products");
  if (!order) throw new ApiError(404, "Order not found");
  res.status(200).json(new ApiResponse(200, order, "Got order"));
});

const GetOrderByUser = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "User not authenticated");

  const orders = await Order.find({ user: req.user._id }).populate({
    path: "products",
    populate: [{ path: "productId" }],
  });

  if (!orders) throw new ApiError(400, "No orders found for this user");

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Got orders for this user"));
});

const GetAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate(["products", "user"]);
  if (!orders) throw new ApiError(400, "No orders found");
  res.status(200).json(new ApiResponse(200, orders, "Got all orders"));
});

export { CreateOrder, GetAllOrders, GetOrderById, GetOrderByUser };
