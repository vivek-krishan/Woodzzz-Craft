import { Router } from "express";
import {
    AddImages,
    DeleteProduct,
    GetAllProducts,
    UploadNewProduct,
    GetProductDetails,
    UpdateProductDetails,
    ClearAndUpdateImages,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyAdmin } from "../middlewares/checkAdmin.middleware.js";

const router = Router();
// router.use(VerifyUser); // Apply VerifyUser middleware to all routes in this file

router
    .route("/")
    .post(VerifyAdmin, upload.single("Image"), UploadNewProduct)
    .get(GetAllProducts)
    .delete(VerifyAdmin,DeleteProduct);

router
    .route("/img-update/:productId")
    .patch(
        VerifyAdmin,
        upload.array([{ name: "Images", maxCount: 4 }]),
        AddImages
    );

router
    .route("/update-all-images")
    .patch(
        VerifyAdmin,
        upload.array([{ name: "Images", maxCount: 5 }]),
        ClearAndUpdateImages
    );

router
    .route("/:productId")
    .get(GetProductDetails)
    .patch(VerifyAdmin, UpdateProductDetails);

export default router;
