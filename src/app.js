const express = require('express');

const app = express();
app.use(express.json());
const { productRouter } = require('./router/product.router');
// não remova esse endpoint, é para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;