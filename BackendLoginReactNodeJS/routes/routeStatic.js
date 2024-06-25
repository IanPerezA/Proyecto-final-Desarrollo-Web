const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/static', express.static(path.join(__dirname, '../../FrontendLoginReactNodeJS/src/juegos')));
router.use('/static/test', express.static(path.join(__dirname, '../../FrontendLoginReactNodeJS/pruebas')));

module.exports = router;