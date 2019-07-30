const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const app = express();

const users = require("./routes/users");
const products = require("./routes/products");

mongoose
  .connect("mongodb://localhost/userProduct")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB."));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/products", products);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
