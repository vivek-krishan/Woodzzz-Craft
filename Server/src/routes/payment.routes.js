import { Router } from "express";
import { VerifyUser } from "../middlewares/auth.middleware.js";
import {
  CreatePaymentId,
  GetAllPayments,
  GetPaymentsById,
  ValidatePayment,
} from "../controllers/payment.controller.js";

const router = Router();
// router.use(VerifyUser);

router.route("/create-new-paymentId").post(VerifyUser, CreatePaymentId);
router.route("/validate-payment").post(VerifyUser, ValidatePayment);


export default router;
