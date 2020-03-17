'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    year: DataTypes.INTEGER,
    note: DataTypes.FLOAT
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.associate = (models) => {
      Movie.belongsToMany(models.Actor, { as: 'ActorsInMovie', through: models.MovieActor, foreignKey: 'movie_id'});
    }

    Movie.belongsTo(models.Category, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Movie;
};