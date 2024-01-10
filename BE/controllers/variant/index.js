const productModel = require("../../models/Product.js");
const joi = require("joi");
const variantModel = require("../../models/Variant.js");
const categoryModel = require("../../models/Category.js");
const { variantSchema } = require("./validation.js");
const orderModel = require("../../models/Order.js");
const { logOut } = require("../userControler/index.js");

const getVariantById = async (req, res) => {
  try {
    const variantId = req.params.id;
    if (!variantId) {
      return res.status(200).json({
        status: "ERR",
        message: "The variantId is required",
      });
    }
    const variant = await variantModel
      .findById(variantId)
      .populate("productId");

    return res.status(200).json({ variant });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const createVariant = async (req, res) => {
  const productId = req.params.id;
  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(400).json({ message: "product chưa tồn tại" });
  }
  try {
    const { name, image, priceDetail, color, size, countInStock } = req.body;

    const validate = variantSchema.validate({
      name,
      priceDetail,
      color,
      size,
      countInStock,
    });
    if (validate.error) {
      return res.status(400).jon({ error: validate.error.message });
    }
    console.log(priceDetail.price);
    if (priceDetail.saleRatio) {
      Math.round(
        (priceDetail.priceAfterSale =
          (priceDetail.price * (1 - priceDetail.saleRatio / 100) * 1000) / 1000)
      );
      console.log(priceDetail.priceAfterSale);
    }
    console.log(priceDetail);

    const newVariant = await variantModel.create({
      productId,
      name,
      image,
      priceDetail,
      color,
      size,
      countInStock,
    });
    await product.variants.push(newVariant._id);
    await product.save();
    product.countInStock += newVariant.countInStock;
    console.log(product.countInStock);
    await updatePriceDetailProduct(productId)
    await product.save();
    return res.status(201).json({
      variant: newVariant,
      message: "Tao variant thanh cong",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const updateVariant = async (req, res) => {
  const variantId = req.params.id;
  const variant = await variantModel.findById(variantId);
  const product = await productModel.findById(variant.productId);
  const preVariantCountInStock = variant.countInStock;
  try {
    const { name, productId, image, priceDetail, color, size, countInStock } =
      req.body;
    // kiểm tra productId có tồn tại hay k
    if (productId) {
      const productIdUpdated = await productModel.findById(productId);
      if (!productIdUpdated) {
        return res.status(404).json({ message: "product chưa tồn tại" });
      }

      // kiểm tra xem productId có thay đổi k
      if (product._id.toString() !== productId) {
        // Xóa variant trong product cũ
        product.variants.pull(variantId);
        product.countInStock -= variant.countInStock;
        updatePriceDetailProduct(product);
        // cập nhập thêm giá khi thêm product

        // thêm variant trong product mới
        productIdUpdated.variants.push(variantId);
        productIdUpdated.countInStock += variant.countInStock;
        updatePriceDetailProduct(productIdUpdated);
        // xóa countinstock khi xóa variant

        if (countInStock) {
          if (variant.countInStock != countInStock) {
            productIdUpdated.countInStock =
              productIdUpdated.countInStock +
              countInStock -
              variant.countInStock;
          }
        }
        await product.save();
        await productIdUpdated.save();
      }
    } else {
      if (countInStock) {
        if (variant.countInStock != countInStock) {
          product.countInStock =
            product.countInStock - variant.countInStock + countInStock;
          await product.save();
        }
      }
    }
    // nếu thêm or thay đổi saleRatio -> tính lại giá

    if (priceDetail) {
      // Kiểm tra variant có tồn tại trong đơn hàng hay k?
      const variantInOrder = await orderModel.find({
        orderDetail: {
          $elemMatch: {
            variant: variantId,
          },
        },
        status: { $in: ["0", "1"] },
      });
      const isVariantInOrder = variantInOrder.length != 0 ? true : false;
      if (isVariantInOrder) {
        return res.status(400).json({
          success: false,
          message:
            "không thể thay đổi vì có sản phẩm đang tồn tại trong đơn hàng",
        });
      }
      if (priceDetail?.saleRatio) {
        priceDetail.priceAfterSale =
          priceDetail.price * (1 - priceDetail.saleRatio / 100);
        console.log(priceDetail.priceAfterSale);
      }
    }

    const updated = await variantModel.findByIdAndUpdate(variantId, req.body, {
      new: true,
    });
    await updatePriceDetailProduct(updated.productId);
    return res
      .status(200)
      .json({ message: "update sản phẩm thành công", updated });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const deleteVariant = async (req, res) => {
  const variantId = req.params.id;
  const variant = await variantModel.findById(variantId);
  const product = await productModel.findById(variant.productId);
  try {
    // check variant có trong order không
    const variantInOrder = await orderModel.find({
      orderDetail: {
        $elemMatch: {
          variant: variantId,
        },
      },
      status: { $in: ["0", "1"] },
    });
    const isVariantInOrder = variantInOrder.length != 0 ? true : false;
    if (isVariantInOrder) {
      return res.status(400).json({
        success: false,
        message:
          "không thể thay đổi vì có sản phẩm đang tồn tại trong đơn hàng",
      });
    }
    // Xóa variant
    const variantDeleted = await variantModel.findByIdAndDelete({
      _id: variantId,
    });
    // trừ sản phẩm trong product
    product.countInStock -= variant.countInStock;
    await product.variants.pull(variantId)
    await product.save();
    console.log(product._id);
    await updatePriceDetailProduct(product._id)
    return res.status(200).json({ message: "Xoa san pham thanh cong" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const updatePriceDetailProduct = async (productId) => {
  try {
    const product = await productModel.findById(productId);
    console.log(product);
    const variantId = product.variants[0] ? product.variants[0] : null;
    console.log(variantId);
    // product.priceDetail =
    if (variantId) {
      const variant = await variantModel.findById(variantId);
      product.priceDetail = variant.priceDetail;

      console.log(product.priceDetail);
      product.save();
    }else{

      product.priceDetail = {};
      product.save();
    }
  } catch (error) {
    console.error(`Error updating variant price: ${error.message}`);
  }
};

module.exports = {
  getVariantById,
  createVariant,
  updateVariant,
  deleteVariant,
};
