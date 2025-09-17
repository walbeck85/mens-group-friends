import React from 'react';
import { Link } from 'react-router-dom';
import { Friend } from '../types/Friend';
import { friendsApi } from '../services/friendsApi';
import './FriendCard.css';

interface FriendCardProps {
  friend: Friend;
  onDelete?: (id: number) => void;
  showDeleteButton?: boolean;
}

const FriendCard: React.FC<FriendCardProps> = ({ 
  friend, 
  onDelete, 
  showDeleteButton = true 
}) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to remove ${friend.name}?`)) {
      try {
        await friendsApi.deleteFriend(friend.id);
        if (onDelete) {
          onDelete(friend.id);
        }
      } catch (error) {
        console.error('Error deleting friend:', error);
        alert('Failed to delete friend. Please try again.');
      }
    }
  };

  return (
    <div className="friend-card">
      <Link to={`/friend/${friend.id}`} className="friend-card-link">
        <div className="friend-card-image">
          <img src={friend.photo} alt={friend.name} />
        </div>
        <div className="friend-card-content">
          <h3 className="friend-card-name">{friend.name}</h3>
          <p className="friend-card-description">{friend.description}</p>
        </div>
      </Link>
      {showDeleteButton && (
        <button 
          className="friend-card-delete-btn"
          onClick={handleDelete}
          aria-label={`Remove ${friend.name}`}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default FriendCard;