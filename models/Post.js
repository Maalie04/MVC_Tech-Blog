const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    title: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          len: [4]
        }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [4]
      }
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
