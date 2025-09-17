import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Friend } from '../types/Friend';
import { friendsApi } from '../services/friendsApi';
import './FriendDetail.css';

const FriendDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [friend, setFriend] = useState<Friend | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchFriend(parseInt(id));
    }
  }, [id]);

  const fetchFriend = async (friendId: number) => {
    try {
      setLoading(true);
      const friendData = await friendsApi.getFriendById(friendId);
      setFriend(friendData);
      setError(null);
    } catch (err) {
      setError('Friend not found or failed to load.');
      console.error('Error fetching friend:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!friend) return;

    if (window.confirm(`Are you sure you want to remove ${friend.name}? This action cannot be undone.`)) {
      try {
        await friendsApi.deleteFriend(friend.id);
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error deleting friend:', error);
        alert('Failed to delete friend. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="friend-detail-container">
        <div className="loading">Loading friend details...</div>
      </div>
    );
  }

  if (error || !friend) {
    return (
      <div className="friend-detail-container">
        <div className="error">
          <h2>Oops!</h2>
          <p>{error}</p>
          <Link to="/" className="back-btn">
            ← Back to Friends
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="friend-detail-container">
      <div className="friend-detail-header">
        <Link to="/" className="back-link">
          ← Back to Friends
        </Link>
      </div>

      <div className="friend-detail-card">
        <div className="friend-detail-image">
          <img src={friend.photo} alt={friend.name} />
        </div>
        
        <div className="friend-detail-content">
          <div className="friend-detail-info">
            <h1 className="friend-detail-name">{friend.name}</h1>
            <p className="friend-detail-description">{friend.description}</p>
          </div>
          
          <div className="friend-detail-actions">
            <Link to={`/edit-friend/${friend.id}`} className="edit-btn">
              Edit Profile
            </Link>
            <button 
              onClick={handleDelete} 
              className="delete-btn"
            >
              Remove Friend
            </button>
          </div>
        </div>
      </div>

      <div className="friend-detail-footer">
        <Link to="/add-friend" className="add-another-btn">
          + Add Another Friend
        </Link>
      </div>
    </div>
  );
};

export default FriendDetail;