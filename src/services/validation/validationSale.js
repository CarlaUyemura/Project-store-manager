const { productId, quantity } = require('./schema');
const statusCode = require('../../helpers/statusCode');
const errorMessages = require('../../helpers/errorMessages');

const validateProductId = (id) => {
  const { error } = productId.validate(id);
  if (error) {
    const errorName = { message: errorMessages.invalidProduct };
    return { message: errorName, status: statusCode.InvalidName };
  }
  return false;
};

const validateQuantity = (item) => {
  const { error } = quantity.validate(item);
  if (!item) {
    const errorName = { message: errorMessages.invalidQuantity };
    return { message: errorName, status: statusCode.InvalidName };
  }
  if (error) {
    const errorName = { message: errorMessages.lessQuantity };
    return { message: errorName, status: statusCode.ShortName };
  }
  return false;
};

module.exports = {
  validateProductId,
  validateQuantity,
};