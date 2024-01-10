const Joi = require("joi");

const variantSchema = Joi.object({
  name: Joi.string().required(),
  priceDetail: Joi.object({
    price: Joi.number().required(),
    saleRatio: Joi.number(),
    priceAfterSale: Joi.number(),
  }),
  color: Joi.string().required(),
  size: Joi.string().required(),
  countInStock: Joi.number().positive().integer().required(),
});

module.exports = { variantSchema };
