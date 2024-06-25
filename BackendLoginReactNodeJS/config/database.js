const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('proyecto_web', 'root', '12345678', {
  host: 'localhost',
  port: 3308, 
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

module.exports = sequelize;
