'use strict';

const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: "username is required"
        },
        notEmpty: {
          msg: "username is required"
        },
        async isUnique(value) {
          const dataUser = await User.findOne({
            where:{
              username: value
            }
          })
          if(dataUser){
              throw new Error(`username ${value} sudah terdaftar silahkan login`)
          }
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: "password is required"
        },
        notEmpty: {
          msg: "password is required"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: "email is required"
        },
        notEmpty: {
          msg: "email is required"
        },
        isEmail: {
          msg: "email must have @"
        },
        async isUnique(value) {
          const dataUser = await User.findOne({
            where:{
              email: value
            }
          })
          if(dataUser){
              throw new Error(`email ${email} sudah terdaftar silahkan login`)
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(instance => {
    if(!instance.role){
      instance.role = "User";
    }
      
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(instance.password, salt);
      instance.password = hash;
  })
  return User;
};