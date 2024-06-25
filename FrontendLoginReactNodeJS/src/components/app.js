import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login';  // Asegúrate de que la ruta sea correcta
import Administrador from './administrador';
import Usuario from './usuario';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Proyecto/administrador" component={Administrador} />
        <Route path="/Proyecto/usuario" component={Usuario} />
      </Switch>
    </Router>
  );
}

export default App;
