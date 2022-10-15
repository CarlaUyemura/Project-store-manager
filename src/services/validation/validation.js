const { insertProductSchema } = require('./schema');
const statusCode = require('../../helpers/statusCode');
const errorMessages = require('../../helpers/errorMessages');

const validateName = (name) => {
  const { error } = insertProductSchema.validate(name);
  console.log(name);
  if (!name.name) {
    return { message: { message: errorMessages.invalidName }, status: statusCode.InvalidName };
  }
  if (error) {
    return { message: { message: errorMessages.shortName }, status: statusCode.ShortName };
  }
  return false;
};

module.exports = {
  validateName,
};