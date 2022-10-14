const productService = require('../services/product.service'); 

const controllerGetAll = async (_req, res) => {
  const { status, message } = await productService.serviceGetAll();
  res.status(status).json(message);
};

const controllerGetById = async (req, res) => {
  const productId = req.params;
  const { status, message } = await productService.serviceGetById(productId);
  console.log(message);
  res.status(status).json(message);
};

module.exports = {
  controllerGetAll,
  controllerGetById,
};