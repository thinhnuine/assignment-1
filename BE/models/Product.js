const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    priceDetail: {
      price: { type: Number, },
      saleRatio: { type: Number, },
      priceAfterSale: { type: Number, },
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "categories",
    },
    countInStock: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
    detailProduct: {
      material: { type: String },
      form: { type: String },
      color: { type: String },
      design: { type: String },
      image: { type: String },
      // required: true,
    },
    variants: [{ type: mongoose.Types.ObjectId, ref: "variants" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productModel);
