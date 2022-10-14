const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allProductsResponse } = require('../../../__tests__/_dataMock');
const productModel = require('../../../src/models/product.model');

describe('Model de produtos', () => {
  describe('Listar todos os produtos', () => {

    beforeEach(() => { 
      sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    });

    it('Verificar se retornar um array de todos os produtos', async () => { 
      const result = await productModel.modelGetAll();

      expect(result).to.be.a('array');
      expect(result).to.be.equal(allProductsResponse);
    });

    afterEach(() => {
      sinon.restore();
    });
  });
});