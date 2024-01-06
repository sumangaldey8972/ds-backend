const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const bearer_token = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: false,
      body: "Invalid request. You are not authenticated yet.",
    });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: false,
          body: "Invalid request. You are not authenticated yet.",
        });
      } else {
        next();
      }
    });
  }
};

module.exports = bearer_token;
