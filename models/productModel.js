const Joi = require("joi");
const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    productName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      validate: {
        validator: function(v) {
          return v && v.length > 0;
        },
        message: "Product Name should not be empty."
      }
    },
    productPrice: {
      type: Number,
      required: true
    }
  })
);

function validateProduct(product) {
  const schema = {
    productName: Joi.string()
      .min(3)
      .max(255)
      .required(),
    productPrice: Joi.number().required()
  };

  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
