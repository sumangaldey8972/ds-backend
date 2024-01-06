const employeeModels = require("../models/employee.models");
const mongo = require("mongodb");
const objectId = mongo.ObjectId;

const get_employee_query = async (page, limit) => {
  try {
    const options = {
      page: page,
      limit: limit,
    };

    const aggregateDetails = employeeModels.aggregate([]);
    const details = await employeeModels.aggregatePaginate(
      aggregateDetails,
      options,
      function (error, results) {
        if (error) {
          return error;
        }
        return results;
      }
    );

    return Promise.resolve({
      status: true,
      status_code: 200,
      data: details,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const create_employee_query = async (details) => {
  try {
    let is_existing_employee = await employeeModels.findOne({
      email: details.email,
    });

    if (is_existing_employee) {
      return Promise.reject({
        status: false,
        status_code: 401,
        message: "Error: This email is already in use. Please choose another",
      });
    } else {
      const create_employee = await employeeModels.create(details);
      if (create_employee) {
        return Promise.resolve({
          status: true,
          status_code: 200,
          message: "New Employee added to the system",
        });
      } else {
        return Promise.reject({
          status: false,
          status_code: 500,
          message: "can not add employee something went wrong",
        });
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const edit_employee_query = async (employee_id, details) => {
  try {
    let is_employee_exist = await employeeModels.findOne({
      _id: new objectId(employee_id),
    });

    if (is_employee_exist !== null) {
      await employeeModels.findOneAndUpdate(
        {
          _id: new objectId(employee_id),
        },
        {
          $set: {
            employee_id: details.employee_id,
            name: details.name,
            phone: details.phone,
            designation: details.designation,
            salary: details.salary,
          },
        }
      );
      return Promise.resolve({
        status: true,
        status_code: 200,
        message: "Employee Details updated",
      });
    } else {
      return Promise.reject({
        status: false,
        status_code: 403,
        message: "Employee not found",
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  create_employee_query,
  edit_employee_query,
  get_employee_query,
};
