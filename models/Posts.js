const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: { DataTypes.INTEGER, 
   allowNull: false,
   primaryKey: true,
   autoIncrement: true
  },
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
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
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
