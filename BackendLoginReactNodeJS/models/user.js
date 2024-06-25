const { DataTypes } = require('sequelize');  
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,  
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
    tipousuario: {
    type: DataTypes.INTEGER, 
    allowNull: false
  }
}, {
  tableName: 'usuarios'  
});

module.exports = User;
