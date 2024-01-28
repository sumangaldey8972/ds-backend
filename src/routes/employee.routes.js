const { validate } = require("express-validation");
const {
  create_employee_validation,
  get_employee_validation,
  edit_employee_validation,
  delete_employee_validation,
} = require("../validation/employee.validation");
const {
  create_employee_controller,
  get_employee_controller,
  edit_employee_controller,
  delete_employee_controller,
} = require("../controllers/employee.controllers");
const employee_error = require("../errors/employee.errors");
const bearer_token = require("../middleware/middleware");

const router = require("express").Router();

router.get(
  "/",
  validate(get_employee_validation),
  bearer_token,
  get_employee_controller
);

router.post(
  "/",
  validate(create_employee_validation),
  bearer_token,
  create_employee_controller
);

router.patch(
  "/edit",
  validate(edit_employee_validation),
  bearer_token,
  edit_employee_controller
);

router.delete(
  "/delete",
  validate(delete_employee_validation),
  bearer_token,
  delete_employee_controller
);

router.use(employee_error);

module.exports = router;
