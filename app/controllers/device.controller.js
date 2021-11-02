const db = require("../models");
const Device = db.devices;
const Op = db.Sequelize.Op;

// Create and Save a new Device
exports.create = (req, res) => {
    // Validate request
    if (!req.body.device_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
 
    // Create a Device
    const device = {
      device_id:req.body.device_id,
      email: req.body.email,
      imei: req.body.imei,
      name: req.body.name,
      version: req.body.version,
      country: req.body.country,
      language: req.body.language,
      totalRam: req.body.totalRam,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Device in the database
    Device.create(device)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Device."
        });
      });
  };

// find device by email from the database.
exports.findAll = (req, res) => {
   // const email = req.query.email;
  //  var condition = email ? { email: { [Op.between]: `%${email}%` } } : null;
  
    Device.findAll({
      where: {
      email: req.body.email
      }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Devices."
        });
      });
  };

 
// Find a single Device with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Device.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Device with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Device with id=" + id
        });
      });
  };

// Update a Device by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Device.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Device was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Device with id=${id}. Maybe Device was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Device with id=" + id
        });
      });
  };
// Delete a Device with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Device.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Device was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Device with id=${id}. Maybe Device was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Device with id=" + id
        });
      });
  };

// Delete all Devices from the database.
exports.deleteAll = (req, res) => {
    Device.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Devices were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Devices."
        });
      });
  };

// Find all published Devices
exports.findAllPublished = (req, res) => {
    Device.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Devices."
        });
      });
  };
  