const { Product, validate } = require("../models/productModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort("productName");
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice
  });
  product = await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      productName: req.body.productName,
      productPrice: req.body.productPrice
    },
    { new: true }
  );
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  // const index = products.indexOf(product);
  // products.splice(index, 1);

  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");
  res.send(product);
});

module.exports = router;
