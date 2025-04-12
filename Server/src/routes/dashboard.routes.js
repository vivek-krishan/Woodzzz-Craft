import { Router } from "express";
import {
  completeOrder,
  getAllOrders,
  getCounting,
} from "../controllers/dashboard.controller.js";
import { VerifyAdmin } from "../middlewares/checkAdmin.middleware.js";

const router = Router();

router.use(VerifyAdmin); // Apply VerifyUser middleware to all routes in this file

router.route("/all-orders").get(getAllOrders);
router.route("/counting").get(getCounting);
router.route("/complete-order/:orderId").post(completeOrder);

export default router;
