const { getAllCategory, createCategory } = require("../controllers/product");
const { authentication } = require("../middlewares/authenticator");
const { authorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.get('/', getAllCategory)
// router.post("/create-category",authentication,authorization, createCategory);

module.exports = router;