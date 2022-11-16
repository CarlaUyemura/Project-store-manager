const { insertProductSchema } = require('./schema');
const statusCode = require('../../helpers/statusCode');
const errorMessages = require('../../helpers/errorMessages');

const validateName = ({ name }) => {
  const { error } = insertProductSchema.validate(name);
  if (!name) {
    const errorName = { message: errorMessages.invalidName };
    return { message: errorName, status: statusCode.InvalidName };
  }
  if (error) {
    const errorName = { message: errorMessages.shortName };
    return { message: errorName, status: statusCode.ShortName };
  }
  return false;
};

module.exports = {
  validateName,
};