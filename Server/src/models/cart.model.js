import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartProduct: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    customization: {
      data: {
        type: String,
      },
      fileId: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const Cart = new mongoose.model("Cart", cartSchema);
