import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routers
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);

export { app };
