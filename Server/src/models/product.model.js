import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        url: { type: String, required: true },
        fileId: {
          type: String, // ImageKit file ID
          required: true, // The unique identifier for the uploaded image file
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    summery: {
      type: String,
      required: true,
    },
    price: {
      wasPrice: { type: Number }, // For Storing the previous price
      currentPrice: { type: Number, required: true }, // For Storing the current price
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
