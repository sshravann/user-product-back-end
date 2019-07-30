const { User, validate } = require("../models/userModel");
const express = require("express");
const router = express.Router();

router.get("/", async (request, response) => {
  const users = await User.find().sort("username");
  response.send(users);
});

router.post("/", async (request, response) => {
  const { error } = validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  let user = new User({
    email: request.body.email,
    username: request.body.username,
    password: request.body.password
  });
  user = await user.save();
  response.send(user);
});

router.put("/:id", async (request, response) => {
  const { error } = validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    request.params.id,
    {
      email: request.body.email,
      username: request.body.username,
      password: request.body.password
    },
    { new: true }
  );

  if (!user)
    return response.status(404).send("The User with the given ID not found.");

  response.send(user);
});

router.delete("/:id", async (request, response) => {
  const user = await User.findByIdAndRemove(request.params.id);

  if (!user)
    return response.send(404).send("The User with the given ID not found.");

  response.send(user);
});

router.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);

  if (!user)
    return response.send(404).send("The User with the given ID not found");

  response.send(user);
});

module.exports = router;
