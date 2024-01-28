const {
  create_employee_query,
  edit_employee_query,
  get_employee_query,
  delete_employee_query,
} = require("../query/employee.query");

const get_employee_controller = async (req, res, next) => {
  try {
    const response = await get_employee_query(
      Number(req.query.page) || 1,
      Number(req.query.limit) || 10,
      req.query.search || ""
    );
    return res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

const create_employee_controller = async (req, res, next) => {
  try {
    const response = await create_employee_query(req.body);
    return res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

const edit_employee_controller = async (req, res, next) => {
  try {
    const response = await edit_employee_query(req.query.employee_id, req.body);
    return res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

const delete_employee_controller = async (req, res, next) => {
  try {
    const response = await delete_employee_query(req.query.employee_id);
    return res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get_employee_controller,
  create_employee_controller,
  edit_employee_controller,
  delete_employee_controller,
};
