import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import StockDetails from './StockDetails';
import FavoritesPage from './FavoritesPage';

const mockStock = {
  ticker: "AAPL",
  industry: "Technology",
  price: 150.25
};

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
        </nav>

        <Switch>
          <Route path="/" exact>
            <StockDetails stock={mockStock} />
          </Route>
          <Route path="/favorites" component={FavoritesPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
