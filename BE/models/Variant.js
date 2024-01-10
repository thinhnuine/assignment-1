const mongoose = require("mongoose");

const variantModel = new mongoose.Schema(
  {
    productId: { type: mongoose.Types.ObjectId, ref: "products" },
    name: { type: String },
    image: { type: String },
    priceDetail: {
      price: { type: Number, required: true },
      saleRatio: { type: Number, },
      priceAfterSale: { type: Number, },
    },
    color: { type: String },
    size: { type: String },
    countInStock: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("variants", variantModel);
  