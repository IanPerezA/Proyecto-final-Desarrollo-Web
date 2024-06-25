import axios from 'axios';

const API_URL = 'https://localhost:9999/api/games';

const getAllGames = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('getAllGames response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all games:', error);
    throw error;
  }
};

const getGameById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log('getGameById response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching game with ID ${id}:`, error);
    throw error;
  }
};

const createGame = async (gameData) => {
  try {
    console.log('createGame with data:', gameData);
    const response = await axios.post(API_URL, gameData);
    console.log('createGame response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
};

const updateGame = async (id, gameData) => {
  try {
    console.log(`updateGame with ID ${id} and data:`, gameData);
    const response = await axios.put(`${API_URL}/${id}`, gameData);
    console.log('updateGame response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating game with ID ${id}:`, error);
    throw error;
  }
};

const deleteGame = async (id) => {
  try {
    console.log(`deleteGame with ID ${id}`);
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('deleteGame response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting game with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};
