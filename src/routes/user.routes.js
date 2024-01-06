const { validate } = require("express-validation");
const { singin_user_validation } = require("../validation/user.validation");
const { sigin_user_controller } = require("../controllers/user.controller");
const user_error = require("../errors/user.error");

const routes = require("express").Router();

routes.post("/login", validate(singin_user_validation), sigin_user_controller);

routes.use(user_error);

module.exports = routes;
