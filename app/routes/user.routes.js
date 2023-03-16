module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/email/", users.createByEmail);
  // Create a new User by Google
  router.post("/google/", users.createByGoogle);
  //Update verification
  router.get("/verification/:email/:verificationCode", users.updateVerification);
  //Send Password
  router.post("/sendpassword/", users.sendPassword);
  //Login
  router.post("/loginUser/", users.loginUser);
  // Retrieve all Users
  router.get("/find/", users.findAll);


  // Retrieve a single User with Email
  router.get("/find/:email", users.findOne);

  // Update a User with id
  router.put("/update/:id", users.update);

  // Delete a User with id
  router.delete("/del/:id", users.delete);

  // Create a new User
  router.delete("/del/", users.deleteAll);

  app.use("/api/users", router);
};
