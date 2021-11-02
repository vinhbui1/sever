module.exports = (sequelize, DataTypes) => {
    const Info = sequelize.define("info", {
      device_id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      Latitude: {
        type: DataTypes.FLOAT
      },
      Longitude: {
        type: DataTypes.FLOAT
      },
      getSms: {
        type: DataTypes.JSON
      },
      logCall: {
        type: DataTypes.JSON
      },
      history: {
        type: DataTypes.JSON
      },
      Contact: {
        type: DataTypes.JSON
      },
    });
  
    return Info;
  };