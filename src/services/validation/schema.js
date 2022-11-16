const Joi = require('joi');

const insertProductSchema = Joi.string().min(5);

const quantity = Joi.integer().min(1);

const productId = Joi.number().integer().min(1).required();

module.exports = {
  insertProductSchema,
  quantity,
  productId,
};