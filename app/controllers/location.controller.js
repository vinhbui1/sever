const db = require("../models");
const location = db.Location;
const Op = db.Sequelize.Op;
const Device = db.devices;

// Create and Save a new location
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Latitude) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    ///check exits in database
    location.findOne({
      where: {
        device_id: req.body.device_id
      }
    }).then(location => {
      if (location) {
        res.status(400).send({
          message: "Failed! Device_ID is already in use!"
        });
        return;
      }
  
      // Email
      Device.findOne({
        where: {
          device_id: req.body.device_id
        }
      }).then(Device => {
        if (!Device) {
          res.status(400).send({
            message: "Failed! device is not in database!"
          });
          return;
        }
  
        next();
      });
    });
    // Create a location
    const Location = {
      Latitude: req.body.Latitude,
      Longitude: req.body.Longitude,
      device_id:req.body.device_id
    };
  
    // Save location in the database
    location.create(Location)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the location."
        });
      });
  };

// Retrieve all locations from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    location.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations."
        });
      });
  };

// Find a single location with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    location.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find location with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving location with id=" + id
        });
      });
  };

// Update a location by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    location.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "location was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update location with id=${id}. Maybe location was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating location with id=" + id
        });
      });
  };
// Delete a location with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    location.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "location was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete location with id=${id}. Maybe location was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete location with id=" + id
        });
      });
  };

// Delete all locations from the database.
exports.deleteAll = (req, res) => {
    location.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} locations were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all locations."
        });
      });
  };

// Find all published locations
exports.findAllPublished = (req, res) => {
    location.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations."
        });
      });
  };
  