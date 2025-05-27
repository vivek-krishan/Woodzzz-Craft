import { Router } from "express";
import {
  AddImages,
  DeleteProduct,
  GetAllProducts,
  UploadNewProduct,
  GetProductDetails,
  UpdateProductDetails,
  ClearAndUpdateImages,
  toggleStockStatus,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyAdmin } from "../middlewares/checkAdmin.middleware.js";

const router = Router();
// router.use(VerifyUser); // Apply VerifyUser middleware to all routes in this file

router
  .route("/")
  .post(VerifyAdmin, upload.single("Image"), UploadNewProduct)
  .get(GetAllProducts);

router
  .route("/img-update/:productId")
  .post(VerifyAdmin, upload.array("images", 4), AddImages);

router
  .route("/update-all-images/:productId")
  .patch(VerifyAdmin, upload.array("images"), ClearAndUpdateImages);

router.route("/toggle-stock/:productId").patch(VerifyAdmin, toggleStockStatus);

router
  .route("/product-details/:productId")
  .get(GetProductDetails)
  .post(VerifyAdmin, UpdateProductDetails)
  .delete(VerifyAdmin, DeleteProduct);

export default router;
