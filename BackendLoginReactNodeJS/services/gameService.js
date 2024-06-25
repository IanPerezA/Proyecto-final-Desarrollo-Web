const Game = require('../models/game');

const getAllGames = async () => {
  return await Game.findAll();
};

const getGameById = async (id) => {
  return await Game.findByPk(id);
};

const createGame = async (gameData) => {
  return await Game.create(gameData);
};

const updateGame = async (id, gameData) => {
  const game = await Game.findByPk(id);
  if (game) {
    return await game.update(gameData);
  }
  return null;
};

const deleteGame = async (id) => {
  const game = await Game.findByPk(id);
  if (game) {
    return await game.destroy();
  }
  return null;
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};
