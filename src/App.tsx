// This is the main entry for routing: it wires up all the pages and decides which one shows depending on the URL.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FriendDetail from './pages/FriendDetail';
import AddFriend from './pages/AddFriend';
import './App.css';

// This is the root component, the boss that wraps everything in a Router.
function App() {
  return (
    <Router>
      {/* Here’s where we map paths to components, so clicking around feels like an app instead of a collection of random files. */}
      <div className="App">
        <Routes>
          {/* Home page with friend grid and search bar. */}
          <Route path="/" element={<Home />} />
          {/* Detail page for a single friend—full bio and delete option. */}
          <Route path="/friend/:id" element={<FriendDetail />} />
          {/* Form page to recruit a new friend into the lineup. */}
          <Route path="/add-friend" element={<AddFriend />} />
        </Routes>
      </div>
    </Router>
  );
}

// This exports App as default, the top‑level component everyone else relies on.
export default App;
