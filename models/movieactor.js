'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieActor = sequelize.define('MovieActor', {
    actorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Actor',
        key: 'id'
      }
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Movie',
        key: 'id'
      }
    }
  }, {});
  MovieActor.associate = function(models) {
    // associations can be defined here
    MovieActor.belongsTo(models.Actor);
    MovieActor.belongsTo(models.Movie);
  };
  return MovieActor;
};