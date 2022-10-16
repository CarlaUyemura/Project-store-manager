const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allProductsResponse, productSearchNameResponse } = require('../../../__tests__/_dataMock');
const { productModel } = require('../../../src/models/index');

const mockReturnDB = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
]

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
      sinon.stub(connection, 'execute').resolves([productSearchNameResponse]);
    });
    it('Verifica se retorna o item pelo id', async () => {
      const result = await productModel.modelGetById(1);

      expect(result).to.be.a('object');
      expect(result).to.be.deep.equal(productSearchNameResponse[0]);
    });

     afterEach(() => {
      sinon.restore();
    });
  });

  describe('Inserir um porduto', () => {

    it('Verifica se o item é inserido com sucesso', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
      const result = await productModel.modelInsertProduct('Espada da Rukia');
       expect(result).to.equal(5);
    });
 
    afterEach(() => {
      sinon.restore();
    });
  });
  describe('Atualiza um porduto', () => {
    it('Verifica se atualiza UPDATE com sucesso', async () => {
      sinon.stub(connection, 'execute').resolves(mockReturnDB);
      const { id, name } = productSearchNameResponse[0];
      const result = await productModel.modelUpdateProduct(id,name);
      expect(result.affectedRows).to.be.deep.equal(1);
      expect(result.changedRows).to.be.deep.equal(1);
    });
      afterEach(() => {
      sinon.restore();
    });
  });
  describe('Deleta um porduto', () => {
    it('Verifica se deleta um produto com sucesso', async () => {
      sinon.stub(connection, 'execute').resolves(mockReturnDB);
      const { id } = productSearchNameResponse[0];
      const result = await productModel.modelDeleteProduct(id);
      expect(result.affectedRows).to.be.deep.equal(1);
    });
      afterEach(() => {
      sinon.restore();
    });
  });
});