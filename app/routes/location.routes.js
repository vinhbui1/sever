module.exports = app => {
    const location = require("../controllers/location.controller.js");
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", location.create);
  
    // Retrieve all location
    router.get("/", location.findAll);
  
    // Retrieve all published location
    router.get("/published", location.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", location.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", location.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", location.delete);
  
    // Delete all location
    router.delete("/", location.deleteAll);
  
    app.use('/api/location', router);
  };


