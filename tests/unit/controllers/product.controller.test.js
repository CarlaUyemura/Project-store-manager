const { expect } = require('chai');
const chai = require('chai')
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { allProductsResponse,productSearchNameResponse } = require('../../../__tests__/_dataMock');
const { productService } = require('../../../src/services/index'); 
const { productController } = require('../../../src/controllers/index');

chai.use(sinonChai)

describe('Controller de produtos', () => {
  describe('Listar todos os produtos', () => {
    it('Verificar se retornar um array de todos os produtos', async () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const responseJson = { message: allProductsResponse, status: 200 };
      sinon.stub(productService, 'serviceGetAll').resolves(responseJson);
       
      await productController.controllerGetAll({}, res);
    
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(allProductsResponse);
    });
  });
   describe('Buscar o produto por id', () => {
    it('Verificar se retornar o produto buscado pelo id', async () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const responseJson = { message: productSearchNameResponse, status: 200 };
      sinon.stub(productService, 'serviceGetById').resolves(responseJson);
       
      await productController.controllerGetById({}, res);
    
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(productSearchNameResponse);
    });
   });
  describe('Inserir o produto', () => {
    it('Verificar se é possível inserir o produto', async () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const responseJson = { message: productSearchNameResponse, status: 200 };
      sinon.stub(productService, 'serviceInsertProduct').resolves(responseJson);
       
      await productController.controllerInsertProduct({}, res);
    
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(productSearchNameResponse);
    });
  });
  describe('Atualizar o produto', () => {
    it('Verificar se é possível realizar o update do produto', async () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const responseJson = { message: productSearchNameResponse, status: 200 };
      sinon.stub(productService, 'serviceUpdateProduct').resolves(responseJson);
       
      await productController.controllerUpdateProduct({}, res);
    
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(productSearchNameResponse);
    });
  });
   describe('Deletae do produto', () => {
    it('Verificar se é possível realizar o delete do produto', async () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const responseJson = { status: 200 };
      sinon.stub(productService, 'serviceDeleteProduct').resolves(responseJson);
       
      await productController.controllerDeleteProduct({}, res);
    
      expect(res.status).to.have.been.calledOnceWith(200);
    });
  });
});
