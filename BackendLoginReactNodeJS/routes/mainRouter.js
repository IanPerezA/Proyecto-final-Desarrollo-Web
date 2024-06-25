const express = require('express');
const router = express.Router();
const routerApi = require('./routerApi');

router.use('/api', routerApi);

module.exports = router;
