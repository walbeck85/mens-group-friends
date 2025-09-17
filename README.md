# Men's Group Friends App

A React application for managing and displaying your friend cards with photos, descriptions, and search functionality.

## Features

- 🏠 **Home Page**: Display all friends in a beautiful card grid layout
- 🔍 **Search**: Dynamic filtering by name or description
- 👤 **Friend Details**: Click on any friend card to view detailed information
- ➕ **Add Friends**: Form to add new friends with photo URLs and descriptions
- 🗑️ **Remove Friends**: Delete friends with confirmation prompts
- 📱 **Responsive Design**: Works great on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd /Users/willalbeck/Code/mens-group-friends
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

### Running the Application

The app uses two services that need to run simultaneously:

**Development Mode** (Recommended - runs both services):
```bash
npm run dev
```

**Manual Mode** (run in separate terminals):

Terminal 1 - Start the JSON server:
```bash
npm run server
```

Terminal 2 - Start the React app:
```bash
npm start
```

The application will be available at:
- React App: http://localhost:3000
- JSON Server API: http://localhost:3001

## Technologies Used

- **React 18** with TypeScript
- **React Router Dom** for navigation
- **Axios** for API calls
- **JSON Server** for mock backend
- **CSS3** with responsive design

## Usage

1. **Viewing Friends**: The home page displays all friends in a card grid
2. **Searching**: Use the search bar to filter friends by name or description
3. **Friend Details**: Click any friend card to view their full profile
4. **Adding Friends**: Click "Add New Friend" and fill out the form
5. **Removing Friends**: Click the × button on any friend card

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
