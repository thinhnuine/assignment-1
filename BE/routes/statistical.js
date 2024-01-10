const express = require("express");
const { authentication } = require("../middlewares/authenticator.js");
const { authorization } = require("../middlewares/authorization.js");

const {
  getOrdersToday,
  getOrderDate,
  getOrderMonth,
  getOrderYear,
  getNewUserDay,
  getNewUserMonth,
  getNewUserYear,
} = require("../controllers/statistical");

const { getPagingOrder, getAllOrder } = require("../controllers/order/index.js");

const {
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductPaging,
  createCategory,
} = require("../controllers/product/index.js");
const {
  updateVariant,
  deleteVariant,
  createVariant,
} = require("../controllers/variant/index.js");
const { loginAdmin } = require("../controllers/userControler/index.js");

const statisticalRouter = express.Router();

statisticalRouter.post("/login", loginAdmin);

statisticalRouter.get(
  "/order-today",
  authentication,
  authorization,
  getOrdersToday
);
statisticalRouter.get(
  "/order-day",
  authentication,
  authorization,
  getOrderDate
);
statisticalRouter.get(
  "/order-month",
  authentication,
  authorization,
  getOrderMonth
);
statisticalRouter.get(
  "/order-year",
  authentication,
  authorization,
  getOrderYear
);

// user
statisticalRouter.get("/order", authentication, authorization, getPagingOrder);

// product
statisticalRouter.post(
  "/create-category",
  authentication,
  authorization,
  createCategory
);
statisticalRouter.get(
  "/product/get-by-category",
  authentication,
  authorization,
  getProductByCategory
);
statisticalRouter.get("/product/get-all-paging", getAllProductPaging);
statisticalRouter.post(
  "/product/:id",
  authentication,
  authorization,
  createProduct
);
statisticalRouter.put(
  "/product/:id",
  authentication,
  authorization,
  updateProduct
);
statisticalRouter.delete(
  "/product/:id",
  authentication,
  authorization,
  deleteProduct
);
// variant

statisticalRouter.put(
  "/variant/:id",
  authentication,
  authorization,
  updateVariant
);
statisticalRouter.delete(
  "/variant/:id",
  authentication,
  authorization,
  deleteVariant
);
statisticalRouter.post(
  "/variant/create-variant/:id",
  authentication,
  authorization,
  createVariant
);

// order
statisticalRouter.get("/order/all",authentication,authorization, getAllOrder);
statisticalRouter.get(
  "/product/get-by-category",
  authentication,
  authorization,
  getProductByCategory
);

// variant

//user
statisticalRouter.get(
  "/user-day",
  authentication,
  authorization,
  getNewUserDay
);
statisticalRouter.get(
  "/user-month",
  authentication,
  authorization,
  getNewUserMonth
);
statisticalRouter.get(
  "/user-year",
  authentication,
  authorization,
  getNewUserYear
);

module.exports = statisticalRouter;
