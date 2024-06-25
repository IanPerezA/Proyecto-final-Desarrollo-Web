import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Lazy load de los componentes de los juegos
const Snake = lazy(() => import('./componentes_juegos/snake'));

class Usuario extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '200px', background: '#f4f4f4', padding: '10px' }}>
            <h3>Juegos</h3>
            <ul>
              <li>
                <Link to="/snake">Snake</Link>
              </li>
            </ul>
          </div>
          <div style={{ flex: 1, padding: '10px' }}>
            <Switch>
              <Route path="/snake">
                <Suspense fallback={<div>Cargando...</div>}>
                  <Snake />
                </Suspense>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Usuario;
