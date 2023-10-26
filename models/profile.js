'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }

  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Masukkan nama awal anda'
        },
        notNull: {
          msg: 'Masukkan nama awal anda'
        }
      },
      
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Masukkan nama akhir anda'
        },
        notNull: {
          msg: 'Masukkan nama akhir anda'
        }
      },
      
    },
    bornDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Masukkan tanggal lahir'
        },
        notNull: {
          msg: 'Masukkan tanggal lahir'
        }
      },
      
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Masukkan Alamat anda'
        },
        notNull: {
          msg: 'Masukkan Alamat anda'
        }
      },
      
    },
    imgProfile: {
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
    UserId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};