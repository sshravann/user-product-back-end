const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      validate: {
        validator: function(v) {
          return v && v.length > 0;
        },
        message: "email should not be empty."
      }
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      validate: {
        validator: function(v) {
          return v && v.length > 0;
        },
        message: "username should not be empty."
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      validate: {
        validator: function(v) {
          return v && v.length > 0;
        },
        message: "Password should not be empty."
      }
    }
  })
);

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .email()
      .min(3)
      .max(255)
      .required(),
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
