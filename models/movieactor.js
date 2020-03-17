'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieActor = sequelize.define('MovieActor', {
  }, {});
  MovieActor.associate = function(models) {
    // associations can be defined here
    MovieActor.belongsTo(models.Movie, { foreignKey: 'movie_id', targetKey: 'movie_id', as: 'Movie' });
    MovieActor.belongsTo(models.Actor, { foreignKey: 'actor_id', targetKey: 'actor_id', as: 'Actor' });
  };
  return MovieActor;
};