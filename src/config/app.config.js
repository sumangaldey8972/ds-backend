const dotenv = require("dotenv");
dotenv.config();

exports.app_config = {
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  MONGO_URL: process.env.MONGO_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
};
