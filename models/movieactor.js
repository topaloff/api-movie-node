'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieActor = sequelize.define('MovieActor', {
  
  }, {});
  MovieActor.associate = function(models) {
    // associations can be defined here
    MovieActor.belongsTo(models.Actor);
    MovieActor.belongsTo(models.Movie);
  };
  return MovieActor;
};