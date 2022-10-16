const { expect } = require('chai');
const sinon = require('sinon');
const { allProductsResponse, productSearchNameResponse, wrongSizeProductBody, wrongProductBody, productUpdateExistsNameBody, productUpdateBody } = require('../../../__tests__/_dataMock');
const { productModel } = require('../../../src/models/index');
const { productService } = require('../../../src/services/index'); 
const errorMessages = require('../../../src/helpers/errorMessages'); 
const statusCode = require('../../../src/helpers/statusCode');

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

describe('Service de produtos', () => {
  describe('Listar todos os produtos', () => {
    it('Se der sucesso, verificar se retornar um array de todos os produtos', async () => {
      sinon.stub(productModel, 'modelGetAll').resolves(allProductsResponse);

      const result = await productService.serviceGetAll();

      expect(result.message).to.be.a('array');
      expect(result.message).to.be.equal(allProductsResponse);
    });

    afterEach(() => {
      sinon.restore();
    });
    
    it('Verifica se retornar erro quando falha o retorno', async () => {
      sinon.stub(productModel, 'modelGetAll').resolves(undefined);

      const result = await productService.serviceGetAll();

      expect(result.message).to.be.deep.equal(errorMessages.notFoundProduct);
      expect(result.status).to.but.equal(statusCode.BadRequest);
    });
    
  });
  describe('Busca produto por id', () => {
    it('Verifica se retorna o erro se passado um id que não existe', async () => {
      sinon.stub(productModel, 'modelGetById').resolves(undefined);

      const result = await productService.serviceGetById(6);

      expect(result.message).to.be.deep.equal({ message: errorMessages.notFoundProduct });
      expect(result.status).to.but.equal(statusCode.BadRequest);
    });

      afterEach(() => {
      sinon.restore();
      });
    
     it('Verifica se retorna o produto se passado um id que válido', async () => {
      sinon.stub(productModel, 'modelGetById').resolves(productSearchNameResponse[0]);

       const result = await productService.serviceGetById(1);
       
      expect(result.message).to.be.deep.equal(productSearchNameResponse[0]);
      expect(result.status).to.but.equal(statusCode.OK);
    });
  });

   describe('Inserir um produto', () => {
    it('Verifica se retorna o erro se passado o nome com menos de 5 caracteres', async () => {
      const result = await productService.serviceInsertProduct(wrongSizeProductBody);

      expect(result.message).to.be.deep.equal({ message: errorMessages.shortName });
      expect(result.status).to.but.equal(statusCode.ShortName);
    });

      afterEach(() => {
      sinon.restore();
      });
    
     it('Verifica se retorna o erro se não passar o nome', async () => {
      const result = await productService.serviceInsertProduct(wrongProductBody);

      expect(result).to.be.a('object');
      expect(result.message).to.be.deep.equal({ message: errorMessages.invalidName });
      expect(result.status).to.but.equal(statusCode.InvalidName);
     });
     
     afterEach(() => {
      sinon.restore();
     });

     it('Verifica se retorna o produto com sucesso', async () => {
      sinon.stub(productModel, 'modelInsertProduct').resolves(1);

      const result = await productService.serviceInsertProduct(productUpdateExistsNameBody);

      expect(result.message).to.be.deep.equal(productSearchNameResponse[0]);
      expect(result.status).to.but.equal(statusCode.OkInsert);
     });
   });
  
   describe('Update de um produto', () => {
    it('Verifica se retorna o erro se passado um id inválido', async () => {
      const result = await productService.serviceUpdateProduct({id: 6}, wrongSizeProductBody);

      expect(result.message).to.be.deep.equal({ message: errorMessages.notFoundProduct });
      expect(result.status).to.but.equal(statusCode.BadRequest);
    });

    afterEach(() => {
    sinon.restore();
      });
    it('Verifica se retorna o erro se passado um nome com menos de 5 caracteres e um id válido', async () => {
      sinon.stub(productModel, 'modelGetById').resolves(productSearchNameResponse[0]);
      
      const result = await productService.serviceUpdateProduct({ id: 1 }, wrongSizeProductBody);
       
      expect(result.message).to.be.deep.equal( {message: errorMessages.shortName});
      expect(result.status).to.but.equal(statusCode.ShortName);
    });
     
     afterEach(() => {
      sinon.restore();
     });

  it('Verifica se atualiza o produto com sucesso', async () => {
    sinon.stub(productModel, 'modelGetById').resolves(productSearchNameResponse[0]);
    sinon.stub(productModel, 'modelUpdateProduct').resolves({ id: 1, ...productUpdateBody });
    
    const result = await productService.serviceUpdateProduct({ id: 1 }, productUpdateBody);
    
      expect(result.message).to.be.deep.equal( {id: 1, ...productUpdateBody});
      expect(result.status).to.but.equal(statusCode.OK);
    });
   
     describe('Delete de um produto', () => {
       it('Verifica se retorna o erro se passado um id inválido', async () => {
         const result = await productService.serviceDeleteProduct({ id: 6 });

         expect(result.message).to.be.deep.equal({ message: errorMessages.notFoundProduct });
         expect(result.status).to.but.equal(statusCode.BadRequest);
       });

       afterEach(() => {
         sinon.restore();
       });

    it('Verifica se deleta o produto com sucesso', async () => {
      sinon.stub(productModel, 'modelGetById').resolves(productSearchNameResponse[0]);
      sinon.stub(productModel, 'modelDeleteProduct').resolves(mockReturnDB);
          
       const result = await productService.serviceDeleteProduct({ id: 1 });
      console.log(result);
      expect(result.status).to.be.equal(statusCode.OkDelete);
    });
     });
   });
});