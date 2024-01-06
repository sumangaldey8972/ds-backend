const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongoosePaginate = require("mongoose-paginate-v2");

const user_schema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email Address is required"],
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

user_schema.plugin(aggregatePaginate);
user_schema.plugin(mongoosePaginate);

module.exports = mongoose.model("user", user_schema);
