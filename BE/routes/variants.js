const router = require("express").Router();
const {
  createVariant,
  getVariantById,
  updateVariant,
  deleteVariant,
} = require("../controllers/variant");
const { authentication } = require("../middlewares/authenticator");
const { authorization } = require("../middlewares/authorization");

router.get("/:id", getVariantById);
// router.put("/:id",authentication, authorization, updateVariant);
// router.delete("/:id",authentication, authorization, deleteVariant);
// router.post("/create-variant/:id",authentication, authorization, createVariant);

module.exports = router;
