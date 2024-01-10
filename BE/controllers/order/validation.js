const Joi = require("joi");

const orderSchema = Joi.object({
  orderDetail: Joi.array().items(
    Joi.object({
      variant: Joi.string(),
      quantity: Joi.number().positive().integer().required(),
    })
  ),
  shippingAddress: Joi.object({
    address: Joi.string(),
    district: Joi.string(),
    city: Joi.string(),
  }),
  paymentMethod: Joi.string(),
  status: Joi.string(),
});

module.exports = orderSchema;
