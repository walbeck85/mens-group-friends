// This file defines TypeScript interfaces for friends, making sure our app doesn’t confuse a person with a random object.

// Describes the shape of a full friend record, complete with ID, name, photo, and description.
export interface Friend {
  id: number;
  name: string;
  photo: string;
  description: string;
}

// This is the stripped-down version used when creating a new friend (no ID yet, because they’re not official until added).
export interface FriendFormData {
  name: string;
  photo: string;
  description: string;
}