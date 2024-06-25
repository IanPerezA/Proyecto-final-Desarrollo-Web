const express = require('express');
const router = express.Router();

const routeGame = require('./routeGame');
const routeLogin = require('./routeLogin');
const routeStatic = require('./routeStatic');

router.use('/game', routeGame);
router.use('/login', routeLogin);
router.use(routeStatic);

module.exports = router;