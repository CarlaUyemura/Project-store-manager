const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allProductsResponse } = require('../../../__tests__/_dataMock');
const { productModel } = require('../../../src/models/index');

describe('Model de produtos', () => {
  describe('Listar todos os produtos', () => {

    beforeEach(() => { 
      sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    });

    it('Verificar se retornar um array de todos os produtos', async () => { 
      const result = await productModel.modelGetAll();

      expect(result).to.be.a('array');
      expect(result).to.be.deep.equal(allProductsResponse);
    });

    afterEach(() => {
      sinon.restore();
    });
  });
  describe('Buscar produto por id', () => { 
    beforeEach(() => { 
      sinon.stub(connection, 'execute').resolves(allProductsResponse[0]);
    });
    it('Verifica se retorna o item pelo id', async () => {
        const result = await productModel.modelGetById(1);

      expect(result).to.be.a('object');
      expect(result).to.be.deep.equal(allProductsResponse[0]);
     });



      afterEach(() => {
      sinon.restore();
    });
  })
});