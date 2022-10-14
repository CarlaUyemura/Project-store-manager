const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { allProductsResponse } = require('../../../__tests__/_dataMock');
const productService = require('../../../src/services/product.service'); 
const productController = require('../../../src/controllers/product.controller');

chai.use(sinonChai)

describe('Controller de produtos', () => {
  describe('Listar todos os produtos', () => {
    it('Verificar se retornar um array de todos os produtos', async () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'serviceGetAll').resolves(allProductsResponse);
       
      await productController.controllerGetAll({}, res);
      
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(allProductsResponse.message)
    });
  });
});