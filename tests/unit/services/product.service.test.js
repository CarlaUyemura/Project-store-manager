const { expect } = require('chai');
const sinon = require('sinon');
const { allProductsResponse } = require('../../../__tests__/_dataMock');
const { productModel } = require('../../../src/models/index');
const { productService } = require('../../../src/services/index');  

describe('Service de produtos', () => {
  describe('Listar todos os produtos', () => {
    it('Se der sucesso, verificar se retornar um array de todos os produtos', async () => {
      sinon.stub(productModel, 'modelGetAll').resolves(allProductsResponse);

      const result = await productService.serviceGetAll();

      expect(result.message).to.be.a('array');
      expect(result.message).to.be.equal(allProductsResponse);
    });
  });
});