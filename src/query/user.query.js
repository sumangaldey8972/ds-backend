const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const sign_in_user_query = async (details) => {
  try {
    let existing_user = await userModel.findOne({ email: details.email });

    if (existing_user) {
      if (existing_user.password !== details.password) {
        return Promise.reject({
          status: false,
          status_code: 401,
          message: "Password do not match. try again",
        });
      } else {
        const token = jwt.sign(
          {
            email: existing_user.email,
            id: existing_user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return Promise.resolve({
          status: true,
          status_code: 200,
          massage: "login successfull",
          token: token,
        });
      }
    } else {
      return Promise.reject({
        status: false,
        status_code: 401,
        message: "user not exist",
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  sign_in_user_query,
};
