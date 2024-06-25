// app.js
const express = require('express');
const fs = require('fs');
const https = require('https'); // Asegúrate de requerir https
const bodyParser = require('body-parser');
const cors = require('cors');
const routerApi = require('./routes/routerApi');  
const sequelize = require('./config/database');
const path = require('path');
const mainRouter = require('./routes/mainRouter');

const app = express();
const PORT = process.env.PORT || 9999;

const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log('Iniciando servidor...');

app.use('/static', express.static(path.join(__dirname, '../FrontendLoginReactNodeJS/src/juegos'))); // Sirve archivos estáticos
app.use('/static', express.static(path.join(__dirname, '../../snake.js/js')));
app.use('/static', express.static(path.join('../FrontendLoginReactNodeJS/pruebas')));

app.use(mainRouter);
app.use(routerApi);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Servidor HTTPS escuchando en https://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

console.log('Archivo app.js cargado correctamente');
