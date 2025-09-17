import axios from 'axios';
import { Friend, FriendFormData } from '../types/Friend';

const API_BASE_URL = 'http://localhost:3001';

export const friendsApi = {
  // Get all friends
  getAllFriends: async (): Promise<Friend[]> => {
    const response = await axios.get(`${API_BASE_URL}/friends`);
    return response.data;
  },

  // Get a single friend by ID
  getFriendById: async (id: number): Promise<Friend> => {
    const response = await axios.get(`${API_BASE_URL}/friends/${id}`);
    return response.data;
  },

  // Add a new friend
  addFriend: async (friendData: FriendFormData): Promise<Friend> => {
    const response = await axios.post(`${API_BASE_URL}/friends`, friendData);
    return response.data;
  },

  // Update a friend
  updateFriend: async (id: number, friendData: Partial<Friend>): Promise<Friend> => {
    const response = await axios.put(`${API_BASE_URL}/friends/${id}`, friendData);
    return response.data;
  },

  // Delete a friend
  deleteFriend: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/friends/${id}`);
  }
};