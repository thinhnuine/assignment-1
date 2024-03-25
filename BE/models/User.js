const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    birth_year: {
      type: Number,
    },
    refreshToken: {
      type: String,
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    shippingAddress: {
      address: { type: String },
      district: { type: String },
      city: { type: String },
    },
    cart: {
      cartDetail: [
        {
          variant: {
            type: mongoose.Types.ObjectId,
            ref: "variants",
          },
          quantity: { type: Number, default: 1 },
          color: { type: String },
          size: { type: String },
          image: { type: String },
          name: { type: String },
          priceDetail: {
            price: { type: Number, required: true },
            saleRatio: { type: Number, },
            priceAfterSale: { type: Number, },
          },
          productId: { type: mongoose.Types.ObjectId, ref: "products" },
        },
      ],
      totalPrice: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
