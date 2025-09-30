import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
      activated: {
        type: Boolean,
        default: false,
      },
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
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
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "failed",
      enum: ["pending", "confirmed", "completed", "failed"],
    },
    paymentStatus: {
      type: String,
      default: "failed",
      enum: ["pending", "completed", "failed"],
    },
    paymentMethod: {
      type: String,
      default: "online",
      enum: ["cod", "online"],
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
