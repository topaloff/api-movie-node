'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define('Actor', {
    name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    birth: DataTypes.DATE,
    picture: DataTypes.STRING
  }, {});
  Actor.associate = function(models) {
    Actor.associate = (models) => {
      Actor.belongsToMany(models.Movie, { as: 'MoviesForActor', through: models.MovieActor, foreignKey: 'actor_id'});
    }
    Actor.belongsTo(models.Country, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
    Actor.belongsTo(models.Gender, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Actor;
};