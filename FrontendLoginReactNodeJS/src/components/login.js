import React from "react";
import { Redirect } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider, useAlert } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import logo from '../imagenes/logo.png';
import bg from '../imagenes/bg.jpg';
import '../styles/style_login.css';

const Login = () => {
  const [state, setState] = React.useState({ condition: false, tipousuario: '', error: null });
  const alert = useAlert();

  const validar = (username, password) => {
    console.log("Enviando solicitud de login con:", username, password);
    fetch(`https://localhost:9999/api/login?User=${username}&password=${encodeURIComponent(password)}`)
      .then(response => {
        console.log("Respuesta recibida:", response);
        return response.json();
      })
      .then(usuario => {
        console.log("Datos del usuario:", usuario);
        if (usuario.status === "yes") {
          if (usuario.tipousuario === "1") {
            setState({ condition: true, tipousuario: 'administrador' });
          } else if (usuario.tipousuario === "2") {
            setState({ condition: true, tipousuario: 'usuario' });
          } else {
            setState({ error: 'Tipo de usuario no definido' });
            alert.error('Tipo de usuario no definido');
          }
        } else {
          setState({ condition: false, tipousuario: '', error: 'Credenciales incorrectas' });
          alert.error('Credenciales incorrectas');
          document.getElementById("User").value = '';
          document.getElementById("password").value = '';
        }
      })
      .catch(error => {
        console.log("Error durante la solicitud:", error);
        setState({ error: 'Error de conexión con el servidor' });
        alert.error('Error de conexión con el servidor');
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = document.getElementById("User").value;
    const password = document.getElementById("password").value;
    console.log("Formulario enviado con:", username, password);
    validar(username, password);
  }

  const { condition, tipousuario, error } = state;

  if (condition && tipousuario === "administrador") {
    console.log("Redirigiendo a /Proyecto/administrador");
    return <Redirect to='/Proyecto/administrador' />;
  }
  if (condition && tipousuario === "usuario") {
    console.log("Redirigiendo a /Proyecto/usuario");
    return <Redirect to='/Proyecto/usuario' />;
  }

  const styles = {
    backgroundImage: `url(${bg})`,
  }

  return (
    <div className="center-container" style={styles} id="equis">
      <div className="box">
        <img src={logo} alt="logo" style={{ width: '100px', marginBottom: '10px' }} />
        <h1 className="title">VoiceController</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="User">Nombre de Usuario</label>
            <input placeholder="Ingrese el nombre de usuario" type="text" id="User" className="input" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">Password</label>
            <input placeholder="Ingrese su contraseña" type="password" id="password" className="input" />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <div style={{ marginTop: '20px', color: 'black', textAlign: 'center' }}>
          <p>Integrantes del equipo:</p>
          <ul className="member">
            <li>Perez Aguirre Ian Miztli</li>
            <li>Rivero Lopez Valeria</li>
            <li>Hernandez Ramirez Adrian</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const App = () => (
  <AlertProvider template={AlertTemplate} position={positions.TOP_CENTER} timeout={5000} transition={transitions.SCALE}>
    <Login />
  </AlertProvider>
);

export default App;
