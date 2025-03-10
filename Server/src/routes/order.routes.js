import { Router } from "express";
import {
  CreateOrder,
  GetAllOrders,
  GetOrderById,
  GetOrderByUser,
} from "../controllers/order.controller.js";
import { VerifyAdmin } from "../middlewares/checkAdmin.middleware.js";
import { VerifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(VerifyAdmin, GetAllOrders).post(VerifyUser, CreateOrder);

router.route("/get-order/:orderId").get(VerifyUser, GetOrderById);
router.route("/get-my-orders").get(VerifyUser, GetOrderByUser);

export default router;
