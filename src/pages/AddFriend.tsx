import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FriendFormData } from '../types/Friend';
import { friendsApi } from '../services/friendsApi';
import './AddFriend.css';

const AddFriend: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FriendFormData>({
    name: '',
    photo: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FriendFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FriendFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FriendFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.photo.trim()) {
      newErrors.photo = 'Photo URL is required';
    } else if (!isValidUrl(formData.photo)) {
      newErrors.photo = 'Please enter a valid URL';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const newFriend = await friendsApi.addFriend(formData);
      navigate(`/friend/${newFriend.id}`);
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Failed to add friend. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      photo: '',
      description: ''
    });
    setErrors({});
  };

  return (
    <div className="add-friend-container">
      <div className="add-friend-header">
        <Link to="/" className="back-link">
          ← Back to Friends
        </Link>
      </div>

      <div className="add-friend-card">
        <div className="add-friend-title">
          <h1>Add New Friend</h1>
          <p>Tell us about your friend and add them to your collection</p>
        </div>

        <form onSubmit={handleSubmit} className="add-friend-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your friend's name"
              disabled={loading}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="photo" className="form-label">
              Photo URL *
            </label>
            <input
              type="url"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              className={`form-input ${errors.photo ? 'error' : ''}`}
              placeholder="https://example.com/photo.jpg"
              disabled={loading}
            />
            {errors.photo && <span className="error-message">{errors.photo}</span>}
            <small className="form-help">
              Tip: You can use image URLs from Unsplash, your own hosting, or any public image URL
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Tell us about your friend - their interests, personality, what makes them special..."
              rows={4}
              disabled={loading}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
            <small className="form-help">
              {formData.description.length}/500 characters (minimum 10)
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleReset}
              className="reset-btn"
              disabled={loading}
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Adding Friend...' : 'Add Friend'}
            </button>
          </div>
        </form>

        {formData.photo && isValidUrl(formData.photo) && (
          <div className="photo-preview">
            <h3>Photo Preview:</h3>
            <img 
              src={formData.photo} 
              alt="Preview" 
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              onLoad={(e) => {
                (e.target as HTMLImageElement).style.display = 'block';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriend;