'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.belongsToMany(models.Tag, {
        through: models.PostTag
      })
    }
  }
  
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Isi title dulu'
        },
        notNull: {
          msg: 'title Jangan dikosongin dong'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Isi dulu deskripsinya masseee '
        },
        notNull: {
          msg:'Jangan dikosongin dong deskripsinya'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Upload foto bang'
        }, 
        notNull: {
          msg:'Jangan dikosongin dong fotonya'
        }
      }
    },
    like: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: 'Anda Siapa?'
      },
      notNull: {
        msg: 'Sampean siapa?'
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};