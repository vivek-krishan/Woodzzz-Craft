import { Router } from "express";
import { CreateOrder, GetAllOrders } from "../controllers/order.controller";

const router = Router();

router.route("/").get(GetAllOrders).post(CreateOrder);
