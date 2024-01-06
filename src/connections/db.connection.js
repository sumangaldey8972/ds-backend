const mongoose = require("mongoose");
const { app_config } = require("../config/app.config");
const db_url = app_config.MONGO_URL;

// logger need to be added here
const connect_mongoDb = async () => {
  return mongoose
    .connect(db_url)
    .then((res) => {
      return Promise.resolve({ status: true });
    })
    .catch((error) => {
      return Promise.reject({ status: false });
    });
};

module.exports = connect_mongoDb;
