const express = require('express');
const router = express.Router();
const gameService = require('../services/gameService');

router.get('/', async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo recuperar la lista de juegos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await gameService.getGameById(req.params.id);
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: 'Juego no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo recuperar el juego' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newGame = await gameService.createGame(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el juego' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedGame = await gameService.updateGame(req.params.id, req.body);
    if (updatedGame) {
      res.json(updatedGame);
    } else {
      res.status(404).json({ error: 'Juego no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el juego' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await gameService.deleteGame(req.params.id);
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Juego no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el juego' });
  }
});

module.exports = router;
