const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Partida = sequelize.define('partidas', {
  id_partida: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  id_juego: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_partida: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'partidas', 
  timestamps: false 
});

module.exports = Partida;
