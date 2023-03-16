module.exports = app => {
  const readings = require("../controllers/reading.controller.js");
  var router = require("express").Router();
  
  // Retrieve all Readings
  router.get("/find/", readings.findAll);
  router.get("/find/:slug", readings.findSlug);
  router.get("/findnew/:limit", readings.findNew);


  app.use("/api/readings", router);
};
