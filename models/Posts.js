const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING, 
    text: DataTypes.STRING,
  },
  {
    sequelize,
  }
);

module.exports = Post;