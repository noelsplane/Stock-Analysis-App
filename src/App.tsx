import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import StockQueryForm from './components/StockQuery/StockQueryForm';
import FavoritesPage from './components/Favorites/FavoritesPage';
import './App.css';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div className="App">
          <nav className="navbar">
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<StockQueryForm />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
