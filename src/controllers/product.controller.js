const productService = require('../services/product.service'); 

const controllerGetAll = async (_req, res) => {
  const { status, message } = await productService.serviceGetAll();
  res.status(status).json(message);
};

const controllerGetById = async (req, res) => {
  const productId = req.params;
  const { status, message } = await productService.serviceGetById(productId);
  res.status(status).json(message);
};

const controllerInsertProduct = async (req, res) => {
  const product = req.body;
  const { status, message } = await productService.serviceInsertProduct(product);
  res.status(status).json(message);
};

const controllerUpdateProduct = async (req, res) => {
  const product = req.body;
  const id = req.params;
  const { status, message } = await productService.serviceUpdateProduct(id, product);
  res.status(status).json(message);
};

module.exports = {
  controllerGetAll,
  controllerGetById,
  controllerInsertProduct,
  controllerUpdateProduct,
};