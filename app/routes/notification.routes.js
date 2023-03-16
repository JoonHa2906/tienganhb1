module.exports = app => {
  const notifications = require("../controllers/notification.controller.js");
  var router = require("express").Router();
  
  // Retrieve all Readings
  router.post("/find/", notifications.findAll);
  router.post("/findNew/", notifications.findNew);
  router.post("/create/", notifications.create);
  router.post("/deleteNotification/", notifications.deleteNotification);

  app.use("/api/notifications", router);
};