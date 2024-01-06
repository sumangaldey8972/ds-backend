const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongoosePaginate = require("mongoose-paginate-v2");

const employee_schema = mongoose.Schema(
  {
    employee_id: { type: String },
    name: { type: String, required: [true, "name is required"] },
    phone: { type: String, require: [true, "phone number is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Email Address is required"],
    },
    designation: { type: String },
    salary: { type: Number },
  },
  {
    timestamps: true,
  }
);

employee_schema.plugin(aggregatePaginate);
employee_schema.plugin(mongoosePaginate);

module.exports = mongoose.model("employee", employee_schema);
