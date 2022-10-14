const { expect } = require('chai');
const sinon = require('sinon');
const { allProductsResponse } = require('../../../__tests__/_dataMock');
const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');  

describe('Service de produtos', () => {
  describe('Listar todos os produtos', () => {
    it('Se der sucesso, verificar se retornar um array de todos os produtos', async () => {
      sinon.stub(productModel, 'productGetAll').resolves(allProductsResponse);

      const result = await productService.serviceGetAll();

      expect(result).to.be.a('array');
      expect(result).to.be.equal(allProductsResponse);
    });
  });
});