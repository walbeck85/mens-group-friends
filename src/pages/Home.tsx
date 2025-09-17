// Landing page of the app that shows all friends, lets you search them, and add or remove friends.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Friend } from '../types/Friend';
import { friendsApi } from '../services/friendsApi';
import FriendCard from '../components/FriendCard';
import './Home.css';

const Home: React.FC = () => {
  // These track all the moving pieces: full friend list, filtered list, the search box text, loading spinner, and any error message.
  const [friends, setFriends] = useState<Friend[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // This runs once on mount to grab the friends list.
  useEffect(() => {
    fetchFriends();
  }, []);

  // This recalculates the filtered list whenever friends or search term changes.
  useEffect(() => {
    // Filter friends based on search term
    const filtered = friends.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(filtered);
  }, [friends, searchTerm]);

  // This async function calls the backend to get all friends and updates state accordingly.
  const fetchFriends = async () => {
    try {
      // flip on the loading sign before heading to the server.
      setLoading(true);
      const friendsData = await friendsApi.getAllFriends();
      // stash the new friend list in state once it arrives.
      setFriends(friendsData);
      setError(null);
    } catch (err) {
      // This is where we admit defeat when the server isn’t playing nice.
      setError('Failed to load friends. Please make sure the server is running.');
      console.error('Error fetching friends:', err);
    } finally {
      setLoading(false);
    }
  };

  // This removes a friend from state after deletion.
  const handleFriendDeleted = (deletedId: number) => {
    setFriends(prevFriends => prevFriends.filter(friend => friend.id !== deletedId));
  };

  // This updates the searchTerm as the user types.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // This is the waiting room screen while data is loading.
  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Loading friends...</div>
      </div>
    );
  }

  // This is the error screen with retry button.
  if (error) {
    return (
      <div className="home-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchFriends} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // This is the main homepage UI: header, search, add friend button, friend grid, no results message, and search results count.
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Men's Group</h1>
        <p>A collection of the amazing dudes in my men's group</p>
      </header>

      <div className="home-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search friends by name or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <Link to="/add-friend" className="add-friend-btn">
          + Add New Friend
        </Link>
      </div>

      {filteredFriends.length === 0 ? (
        <div className="no-results">
          {searchTerm ? (
            <p>No friends found matching "{searchTerm}"</p>
          ) : (
            <p>No friends yet. <Link to="/add-friend">Add your first friend!</Link></p>
          )}
        </div>
      ) : (
        <div className="friends-grid">
          {filteredFriends.map(friend => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onDelete={handleFriendDeleted}
            />
          ))}
        </div>
      )}

      {searchTerm && filteredFriends.length > 0 && (
        <div className="search-results-info">
          Found {filteredFriends.length} friend{filteredFriends.length !== 1 ? 's' : ''} matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

// This exports the Home component for routing.
export default Home;