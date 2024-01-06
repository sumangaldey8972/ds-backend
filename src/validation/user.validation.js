const { Joi } = require("express-validation");

const singin_user_validation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  singin_user_validation,
};
