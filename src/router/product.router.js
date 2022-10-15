const express = require('express');
const productController = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.get('/', productController.controllerGetAll);

productRouter.get('/:id', productController.controllerGetById);

productRouter.post('/', productController.controllerInsertProduct);

productRouter.put('/:id', productController.controllerUpdateProduct);

module.exports = {
  productRouter,
};