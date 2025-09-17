import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FriendDetail from './pages/FriendDetail';
import AddFriend from './pages/AddFriend';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friend/:id" element={<FriendDetail />} />
          <Route path="/add-friend" element={<AddFriend />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
