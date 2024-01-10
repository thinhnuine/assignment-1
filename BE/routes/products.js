const router = require("express").Router();
const {
  createProduct,
  createCategory,
  getProductById,
  getAllProductPaging,
  deleteProduct,
  getProductByCategory,
  updateProduct,
  getAllProduct,
} = require("../controllers/product");
const { authentication } = require("../middlewares/authenticator");
const { authorization } = require("../middlewares/authorization");

// GET
router.get("/", getAllProduct);
router.get("/get-all-paging", getAllProductPaging);
router.get("/get-by-category", getProductByCategory);
router.get("/:id", getProductById);
// POST
// router.post("/:id", authentication, authorization, createProduct);
// // PUT
// router.put("/:id",authentication,authorization, updateProduct);

// // DELETE
// router.delete("/:id",authentication,authorization, deleteProduct);

module.exports = router;
