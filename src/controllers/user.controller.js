const { sign_in_user_query } = require("../query/user.query");

const sigin_user_controller = async (req, res, next) => {
  try {
    const response = await sign_in_user_query(req.body);
    return res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sigin_user_controller,
};
