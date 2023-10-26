'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async cekTag(value) {
      const find = await Tag.findAll({where: {name : value}})
      if (find.length === 0) {
        await Tag.create({name: value})
      }
    }

    static associate(models) {
      // define association here
      Tag.belongsToMany(models.Post, {
        through: models.PostTag
      })
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Kasih tag masse'
        },
        notEmpty: {
          msg: 'Jangan dikosongin dong tag nya'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};