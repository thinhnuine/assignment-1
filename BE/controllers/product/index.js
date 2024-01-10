const productModel = require("../../models/Product.js");
const joi = require("joi");
const variantModel = require("../../models/Variant.js");
const categoryModel = require("../../models/Category.js");
const { productSchema, variantSchema } = require("./validation.js");
const orderModel = require("../../models/Order.js");

const getAllProduct = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("category")
      .populate("variants");
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    return res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const getAllProductPaging = async (req, res) => {
  try {
    const pageSize = req.query.pageSize || 10;
    const pageIndex = req.query.pageIndex || 1;
    const products = await productModel
      .find()
      .populate("category")
      .populate("variants")
      .skip(pageSize * pageIndex - pageSize)
      .limit(pageSize);
    const count = await productModel.countDocuments();
    const totalPage = Math.ceil(count / pageSize);

    return res.status(200).json({ products, count, totalPage });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const pageSize = req.query.pageSize || 10; // So luong phan tu trong 1 trang
    const pageIndex = req.query.pageIndex || 1;

    const product = await productModel
      .find({ category: category })
      .populate("variants")
      .populate("category")
      .skip(pageSize * pageIndex - pageSize)
      .limit(pageSize);
    const count = await productModel.countDocuments(product);
    const totalPage = Math.ceil(count / pageSize);

    return res.status(200).json(product, count, totalPage);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res
        .status(200)
        .json({ status: "error", message: "Hãy thêm sản productId" });
    }
    const productCheck = await productModel.findById(productId)
    if (!productCheck) {
    return res
        .status(200)
        .json({ status: "error", message: "Sản phẩm không tồn tại" });
    }
    const product = await productModel
      .findById(productId)
      .populate("category")
      .populate("variants");https://meet.google.com/aqu-itqt-dvr
    

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed" });
  }
};

const createCategory = async (req, res) => {
  try {
    const name = req.body.name;
    const slug = req.body.slug;

    const newCategory = await categoryModel.create({ name, slug });
    return res
      .status(201)
      .json({ category: newCategory, message: "Tao category thanh cong" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi tạo category" });
  }
};

const createProduct = async (req, res) => {
  const categoryId = req.params.id;
  const category = await categoryModel.findById(categoryId);

  if (!category) {
    return res.status(404).json({ message: "category chưa tồn tại" });
  }
  try {
    const { name, slug, priceDetail, countInStock, thumbnail, detailProduct } =
      req.body;

    const validate = productSchema.validate({
      name,
      priceDetail,
      countInStock,
      detailProduct,
    });
    if (validate.error) {
      return res.status(400).json({ error: validate.error.message });
    }

    const newProduct = await productModel.create({
      name,
      slug,
      priceDetail,
      countInStock,
      thumbnail,
      category,
      detailProduct,
    });

    return res.status(201).json({
      product: newProduct,
      message: "Tao san pham thanh cong",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const { name, slug, category, thumbnail, detailProduct } = req.body;

    const product = await productModel.findByIdAndUpdate(
      productId,
      {
        name,
        slug,
        category,
        thumbnail,
        detailProduct,
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json({ message: "update sản phẩm thành công", product });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await productModel.findById(productId);
    // kiểm tra xem có tồn tại product k
    if (!product) {
      return res.status(400).json({ message: "Sản phẩm không tồn tại" });
    }

    console.log(product.variants);

    // Check xem sản phẩm có tồn tại trong đơn hàng hay không?
    for (let i = 0; i < product.variants.length; i++) {
      const element = product.variants[i];
      const productInOrder = await orderModel.find({
        orderDetail: {
          $elemMatch: {
            variant: element,
          },
        },
        status: { $in: ["0", "1"] },
      });

      const isProductInOrder = productInOrder.length != 0 ? true : false;
      console.log(isProductInOrder);
      if (isProductInOrder) {
        return res.status(400).json({
          success: false,
          message: "Có sản phẩm đang tồn tại trong đơn hàng",
        });
      }
      // Nếu không có thì xóa cả các variant bên trong product
      const variant = await variantModel.findByIdAndDelete(element);
      console.log("xóa các variant bên trong product");
    }

    const productDeleted = await productModel.findByIdAndDelete({
      _id: productId,
    });
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
    } else {
      product.priceDetail = {};
      product.save();
    }
  } catch (error) {
    console.error(`Error updating product price: ${error.message}`);
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  getAllProduct,
  getAllProductPaging,
  getProductByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
