// routes/routeLogin.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/', async (req, res) => {  // Ruta /api/login
  const { User: username, password } = req.query;

  try {
    const result = await userService.authenticateUser(username, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', tipo: 'database error' });
  }
});

module.exports = router;
