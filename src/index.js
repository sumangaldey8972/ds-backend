const express = require("express");
const dotenv = require("dotenv");
const compression = require("compression");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const { app_config } = require("./config/app.config");
const cors = require("cors");
const connect_mongoDb = require("./connections/db.connection");

const employee_routes = require("./routes/employee.routes");
const user_routes = require("./routes/user.routes");
function setupMiddlewars(app) {
  dotenv.config();
  app.use(express.json({ limit: "1024mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(cors({ origin: true, credentials: true }));
  app.use(
    session({
      secret: app_config.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: { sameSite: "lax", maxAge: 1 * 60 * 60 * 10000 },
      store: new mongoStore({ mongoUrl: app_config.MONGO_URL }),
    })
  );
}

function setupRoutes(app) {
  app.use("/", employee_routes);
  app.use("/", user_routes);
}

const app = express();
setupMiddlewars(app);
setupRoutes(app);

connect_mongoDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `${app_config.APP_NAME} server listing on ${process.env.PORT}`
      );
    });
  })
  .catch(() => {
    console.log("Error");
  });
