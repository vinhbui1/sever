module.exports = app => {
    const info = require("../controllers/info.controller.js");
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", info.create);
  
    // Retrieve all info
    router.get("/", info.findAll);
  
    // Retrieve all published info
    router.get("/published", info.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:device_id", info.findOne);
  
    // Update a Tutorial with device-id
    router.put("/:device_id", info.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", info.delete);
  
    // Delete all info
    router.delete("/", info.deleteAll);
  
    app.use('/api/info', router);
  };


