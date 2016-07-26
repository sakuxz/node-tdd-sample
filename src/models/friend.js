'use strict';

module.exports = (sequelize, DataTypes) => {
  var friend = sequelize.define('Friend', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    facebookId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return friend;
};
