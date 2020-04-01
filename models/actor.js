'use strict';

module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define('Actor', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false
    },
    name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    birth: DataTypes.DATE,
    picture: DataTypes.STRING
  }, {});
  Actor.associate = function(models) {
   Actor.belongsToMany(models.Movie, {
      through: 'MovieActor'
    });
    Actor.hasMany(models.MovieActor);
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