const Joi = require('joi');

const insertProductSchema = Joi.string().min(5);

module.exports = {
  insertProductSchema,
};