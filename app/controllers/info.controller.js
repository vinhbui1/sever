const db = require("../models");
const info = db.Info;
const Op = db.Sequelize.Op;
const Device = db.devices;

// Create and Save a new location
exports.create = (req, res) => {
    // Validate request
    if (!req.body.device_id) {
      res.status(400).send({
        message: "device id can not be empty!"
      });
      return;
    }

    ///check exits in database
    info.findOne({
      where: {
        device_id: req.body.device_id
      }
    }).then(info => {
      if (info) {
      res.status(400).send({
          message: "Failed! Device_ID is already in use!"
        });
        return;
      }
  
      // check device id exit in column device
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
    const Info = {
      Latitude: req.body.Latitude,
      Longitude: req.body.Longitude,
      device_id:req.body.device_id,
      getSms: req.body.getSms,
      logCall: req.body.logCall,
      history:req.body.history,
      Contact:req.body.Contact,
    };
  
    // Save location in the database
    info.create(Info)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the info."
        });
      });
  };

// Retrieve all locations from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    info.findAll({ where: condition })
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
    const device_id = req.params.device_id;
  
    info.findByPk(device_id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find info with id=${device_id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving info with id=" + device_id
        });
      });
  };

// Update a location by the id in the request
exports.update = (req, res) => {
    const device_id = req.params.device_id;
  
    info.update(req.body, {
      where: { device_id: device_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "info was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update info with id=${id}. Maybe info was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating info with id=" + id
        });
      });
  };
// Delete a info with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    info.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "info was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete info with id=${id}. Maybe info was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete info with id=" + id
        });
      });
  };

// Delete all locations from the database.
exports.deleteAll = (req, res) => {
  info.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} info were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all info."
        });
      });
  };

// Find all published locations
exports.findAllPublished = (req, res) => {
  info.findAll({ where: { published: true } })
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
  