module.exports = app => {
    const device = require("../controllers/device.controller.js");
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", device.create);
  
    // Retrieve all device
    router.post("/email", device.findAll);
  
    // Retrieve all published device
    router.get("/published", device.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", device.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", device.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", device.delete);
  
    // Delete all device
    router.delete("/", device.deleteAll);
  
    app.use('/api/devices', router);
  };


