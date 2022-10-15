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

const modelInsertProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product],
  );
  return insertId;
};

const modelUpdateProduct = async (id, name) => {
 const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
 );
    return result;
};

const modelDeleteProduct = async ({ id }) => {
  const [result] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return result;
};
  
module.exports = {
  modelGetAll,
  modelGetById,
  modelInsertProduct,
  modelUpdateProduct,
  modelDeleteProduct,
};