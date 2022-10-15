const productModel = require('../models/product.model');
const errorMessages = require('../helpers/errorMessages');
const statusCode = require('../helpers/statusCode');
const { validateName } = require('./validation/validation');

const serviceGetAll = async () => { 
  const result = await productModel.modelGetAll();
  if (result) {
    return { message: result, status: statusCode.OK };
  }
  return { message: errorMessages.notFoundProduct, status: statusCode.BadRequest };
};

const serviceGetById = async (productId) => { 
  const result = await productModel.modelGetById(productId);
  if (!result) {
    const error = { message: errorMessages.notFoundProduct };
    return { message: error, status: statusCode.BadRequest };
  }
  return { message: result, status: statusCode.OK };
};

const serviceInsertProduct = async (product) => {
  const error = await validateName(product);

  if (error) return error;

  const result = await productModel.modelInsertProduct(product.name);
  const obj = { id: result, name: product.name };
  return { message: obj, status: statusCode.OkInsert };
};

const serviceUpdateProduct = async (productId, name) => {
  const verifyId = await serviceGetById(productId);

  if (verifyId.status === 404) return verifyId;
  const error = await validateName(name);

  if (error) return error;
  const result = await productModel.modelUpdateProduct(productId.id, name.name);
  
  if (result) {
    const obj = { id: productId.id, name: name.name };
    return { message: obj, status: statusCode.OK };
  }
};

module.exports = {
  serviceGetAll,
  serviceGetById,
  serviceInsertProduct,
  serviceUpdateProduct,
};