const { Joi } = require("express-validation");

const get_employee_validation = {
  query: Joi.object().keys({
    page: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
    search: Joi.string().optional().allow(""),
  }),
};

const create_employee_validation = {
  body: Joi.object({
    employee_id: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email().required(),
    designation: Joi.string().required(),
    salary: Joi.number().required(),
  }),
};

const edit_employee_validation = {
  query: Joi.object().keys({
    employee_id: Joi.string().required(),
  }),
  body: Joi.object({
    employee_id: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(15).required(),
    designation: Joi.string().required(),
    salary: Joi.number().required(),
  }),
};

const delete_employee_validation = {
  query: Joi.object().keys({
    employee_id: Joi.string().required(),
  }),
};

module.exports = {
  get_employee_validation,
  create_employee_validation,
  edit_employee_validation,
  delete_employee_validation,
};

// employee_id: { type: String },
//     name: { type: String, required: [true, "name is required"] },
//     phone: { type: String, require: [true, "phone number is required"] },
//     email: {
//       type: String,
//       unique: true,
//       required: [true, "Email Address is required"],
//     },
//     designation: { type: String },
//     salary: { type: Number },
