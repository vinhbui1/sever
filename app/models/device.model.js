module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define("device", {
      device_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING
      },
      imei: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      totalRam: {
        type: Sequelize.FLOAT
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Device;
  };