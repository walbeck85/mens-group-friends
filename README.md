# Men's Group Friends App

A React application for managing and displaying your friend cards with photos, descriptions, and search functionality.

## Features

- Home Page: Display all friends in a card grid layout
- Search: Dynamic filtering by name or description
- Friend Details: Click on any friend card to view detailed information
- Add Friends: Form to add new friends with photo URLs and descriptions
- Remove Friends: Delete friends with confirmation prompts
- Responsive Design: Works on desktop and mobile devices

## Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Download and Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/walbeck85/mens-group-friends.git
   cd mens-group-friends
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

The app uses two services that need to run simultaneously:

**Option 1: Development Mode (Recommended)**
```bash
npm run dev
```

**Option 2: Manual Mode (run in separate terminals)**

Terminal 1 - Start the JSON server:
```bash
npm run server
```

Terminal 2 - Start the React app:
```bash
npm start
```

### Viewing the Application

Once both services are running, open your browser and navigate to:
- React App: http://localhost:3000
- JSON Server API: http://localhost:3001

## Testing All Features

### 1. Viewing Friends (Home Page)

1. Open http://localhost:3000 in your browser
2. You should see a grid of friend cards displaying:
   - Andy Spiro (Harem Conoisseur)
   - Chad Steinglass (Chad GPT & Staff Daddy)
   - Felipe Baytelman (Tech Guru and Grill Daddy)
   - Josh Buhler (Partner by Day, Nightclub Owner by Night)
3. Verify each card shows a photo, name, and description
4. Test responsive design by resizing browser window

### 2. Search Functionality

1. On the home page, locate the search bar at the top
2. Test searching by name:
   - Type "Chad" - should filter to show only Chad Steinglass
   - Type "Andy" - should filter to show only Andy Spiro
3. Test searching by description:
   - Type "tech" - should show Felipe Baytelman
   - Type "partner" - should show Josh Buhler
4. Clear the search to see all friends again

### 3. Friend Detail View

1. From the home page, click on any friend card
2. Verify you are taken to a detailed view showing:
   - Large photo of the friend
   - Full name as heading
   - Complete description
   - "Remove Friend" button
   - "Back to Friends" link
3. Test the "Back to Friends" link returns you to the home page
4. Test with different friends to ensure all detail pages work

### 4. Add New Friend

1. From the home page, click "Add New Friend" button
2. Fill out the form with test data:
   - Name: Will Albeck
   - Photo URL: https://i.imgur.com/n9veGkc.jpeg
   - Description: Recently single, ladies.
3. Verify form validation:
   - Try submitting with empty fields (should show errors)
   - Try an invalid URL (should show error)
   - Try a description under 10 characters (should show error)
4. Submit the complete form
5. Verify you are redirected to Will Albeck's detail page
6. Return to home page and confirm Will appears in the friends grid
7. Verify Will has been assigned ID 5 and is clickable

### 5. Remove Friend

1. Navigate to any friend's detail page (click on their card from home)
2. Click the "Remove Friend" button
3. Confirm the deletion in the popup dialog
4. Verify you are redirected back to the home page
5. Confirm the friend no longer appears in the friends grid
6. Alternative removal method:
   - From home page, click the X button on any friend card
   - Confirm deletion in the popup
   - Verify friend is removed from the grid

### 6. Testing Add Friend After Removal

1. If you removed Will Albeck during testing, add him back:
   - Click "Add New Friend"
   - Name: Will Albeck
   - Photo URL: https://i.imgur.com/n9veGkc.jpeg
   - Description: Recently single, ladies.
   - Submit the form
2. Verify Will is assigned the next available ID number
3. Test that his detail page works correctly

### 7. API Endpoints Testing

You can test the backend API directly:

```bash
# Get all friends
curl http://localhost:3001/friends

# Get specific friend
curl http://localhost:3001/friends/1

# Add new friend (replace with actual data)
curl -X POST http://localhost:3001/friends \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Friend","photo":"https://example.com/photo.jpg","description":"Test description for new friend"}'

# Delete friend
curl -X DELETE http://localhost:3001/friends/5
```

## Project Structure

```
src/
├── components/
│   ├── FriendCard.tsx          # Individual friend card component
│   └── FriendCard.css          # Friend card styles
├── pages/
│   ├── Home.tsx                # Home page with friends grid and search
│   ├── Home.css                # Home page styles
│   ├── FriendDetail.tsx        # Individual friend detail page
│   ├── FriendDetail.css        # Friend detail styles
│   ├── AddFriend.tsx           # Add new friend form
│   └── AddFriend.css           # Add friend form styles
├── services/
│   └── friendsApi.ts           # API service for friend operations
├── types/
│   └── Friend.ts               # TypeScript interfaces
├── App.tsx                     # Main app with routing
├── App.css                     # Global styles
└── index.tsx                   # App entry point
db.json                         # Mock database with friend data
```

## Technologies Used

- React 18 with TypeScript
- React Router Dom for navigation
- Axios for API calls
- JSON Server for mock backend
- CSS3 with responsive design
- Concurrently for running multiple services

## Troubleshooting

### Port Conflicts
If ports 3000 or 3001 are in use:
```bash
# Kill processes on port 3000
lsof -ti:3000 | xargs kill -9

# Kill processes on port 3001  
lsof -ti:3001 | xargs kill -9
```

### Server Not Starting
1. Ensure all dependencies are installed: `npm install`
2. Try starting services individually in separate terminals
3. Check that db.json file exists and contains valid JSON

### Friend Cards Not Clickable
1. Ensure JSON server is running on port 3001
2. Test API endpoint: `curl http://localhost:3001/friends`
3. Check browser console for errors

### Images Not Loading
1. Verify photo URLs are publicly accessible
2. Check browser network tab for failed image requests
3. Ensure URLs use HTTPS protocol

## Available Scripts

- `npm start` - Runs React app in development mode
- `npm run server` - Starts JSON server only
- `npm run dev` - Starts both React app and JSON server
- `npm run build` - Builds app for production
- `npm test` - Runs test suite