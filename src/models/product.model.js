const camelize = require('camelize');
const connection = require('./connection');

const modelGetAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(result);
};

const modelGetById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId.id],
  );
  return result;
};

module.exports = {
  modelGetAll,
  modelGetById,
};