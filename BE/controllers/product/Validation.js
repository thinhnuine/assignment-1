const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  priceDetail: Joi.object({
    price: Joi.number(),
    saleRatio: Joi.number(),
    priceAfterSale: Joi.number(),
  }),
  countInStock: Joi.number(),
  detailProduct: Joi.object({
    material: Joi.string(),
    form: Joi.string(),
    color: Joi.string(),
    design: Joi.string(),
    image: Joi.string(),
  }).required(),
});


module.exports = { productSchema };
