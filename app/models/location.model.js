module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define("location", {

      Latitude: {
        type: DataTypes.FLOAT
      },
      Longitude: {
        type: DataTypes.FLOAT
      },
    });
  
    return Location;
  };