'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    year: DataTypes.INTEGER,
    note: DataTypes.FLOAT
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsToMany(models.Actor, {
      through: 'MovieActor'
    });
    Movie.hasMany(models.MovieActor);
    Movie.belongsTo(models.Category, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Movie;
};