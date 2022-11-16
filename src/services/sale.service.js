const productService = require('./product.service');
// const errorMessages = require('../helpers/errorMessages');
// const statusCode = require('../helpers/statusCode');
const { validateProductId, validateQuantity } = require('./validation/validationSale');
const saleModel = require('../models/sale.model');

const serviceInsertSale = async (id, quantity) => {
  const result = await productService.serviceGetById(id);
  const errorQuantity = await validateQuantity(quantity);
  const errorProductId = await validateProductId(id);
  if (errorProductId) return errorProductId;
  if (result.status === 404) return result;
  if (errorQuantity) return errorQuantity;
  await saleModel.modelInsertSale();
};

module.exports = {
  serviceInsertSale,
};