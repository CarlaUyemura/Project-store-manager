const productModel = require('../models/product.model');
const errorMessages = require('../helpers/errorMessages');
const statusCode = require('../helpers/statusCode');

const serviceGetAll = async () => { 
  const result = await productModel.modelGetAll();
  if (result) {
    return { message: result, status: statusCode.OK };
  }
  return { message: errorMessages.notFoundProduct, status: statusCode.BadRequest };
};

const serviceGetById = async (productId) => { 
  const result = await productModel.modelGetById(productId);
  if (result) {
    return { message: result, status: statusCode.OK };
  }
  return { message: errorMessages.notFoundProduct, status: statusCode.BadRequest };
};

module.exports = {
  serviceGetAll,
  serviceGetById,
};