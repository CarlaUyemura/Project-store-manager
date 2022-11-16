const connection = require('./connection');

const modelInsertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales() VALUE()',
  );
  return insertId;
};

const modelInsertSaleProducts = async (id, productId, quantity) => {
  const [[result]] = await connection.execute(
    'INSERT INTO sales_products(sale_id, product_id, quantity ) VALUE(?,?,?)',
    [id, productId, quantity],
  );
  return result;
};

module.exports = {
  modelInsertSale,
  modelInsertSaleProducts,
};