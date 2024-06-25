import React, { useState, useEffect } from 'react';
import gameService from '../services/gameService';
import '../styles/style_admin.css';

const Administrador = () => {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({ nombre: '', estudio: '', descripcion: '', imagen: '' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const games = await gameService.getAllGames();
      setGames(games);
    } catch (error) {
      console.error("Error recuperando juegos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando fomulario con :", form);
      if (editing) {
        await gameService.updateGame(currentId, form);
        setEditing(false);
      } else {
        const response = await gameService.createGame(form);
        console.log("Respuesta:", response);
      }
      setForm({ nombre: '', estudio: '', descripcion: '', imagen: '' });
      fetchGames();
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    }
  };

  const handleEdit = (game) => {
    setForm(game);
    setEditing(true);
    setCurrentId(game.id_juego);
  };

  const handleDelete = async (id) => {
    try {
      await gameService.deleteGame(id);
      fetchGames();
    } catch (error) {
      console.error(`Error eliminando juego con ID ${id}:`, error);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Administrador de Juegos</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input type="text" name="estudio" value={form.estudio} onChange={handleChange} placeholder="Estudio" required />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required />
        <input type="text" name="imagen" value={form.imagen} onChange={handleChange} placeholder="Imagen URL" />
        <button type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estudio</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id_juego}>
              <td>{game.nombre}</td>
              <td>{game.estudio}</td>
              <td>{game.descripcion}</td>
              <td><img src={game.imagen} alt={game.nombre} style={{ width: '50px' }} /></td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(game)}>Editar</button>
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(game.id_juego)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Administrador;
