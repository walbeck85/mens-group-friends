// This file defines the individual card component for displaying friends.
import React from 'react';
import { Link } from 'react-router-dom';
import { Friend } from '../types/Friend';
import { friendsApi } from '../services/friendsApi';
import './FriendCard.css';

// Props for FriendCard: expects a friend object, and optionally a delete callback and a flag for showing the delete button.
// Basically, hand it a friend, and it'll show them off. If you want, you can also let people kick their friends out with a button!
interface FriendCardProps {
  friend: Friend;
  onDelete?: (id: number) => void;
  showDeleteButton?: boolean;
}

// The main card renderer that shows the friend and optionally a delete button.
const FriendCard: React.FC<FriendCardProps> = ({ 
  friend, 
  onDelete, 
  showDeleteButton = true 
}) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Time to ask for permission before throwing a friend out. Are you sure about this?
    
    if (window.confirm(`Are you sure you want to remove ${friend.name}?`)) {
      try {
        // Actually call the API to evict this friend from the database.
        await friendsApi.deleteFriend(friend.id);
        if (onDelete) {
          onDelete(friend.id);
        }
      } catch (error) {
        // Oops, deletion failed, better tell the user.
        console.error('Error deleting friend:', error);
        alert('Failed to delete friend. Please try again.');
      }
    }
  };

  // This is the JSX structure of the card with image, name, description, and maybe a delete button.
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

// This is the default export for the component.
export default FriendCard;