# Voting App Frontend

A React-based frontend for a voting application that allows users to vote on existing options or create new ones.

## Features

- User authentication (login/register)
- Vote on existing options or create new ones
- Admin dashboard to view voting results
- User management for administrators
- JWT authentication for secure API calls

## Prerequisites

- Node.js (v16.x or higher recommended)
- npm or yarn package manager
- Backend API server running (see backend repository)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/voting-app-frontend.git
   cd voting-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   *Note: Adjust the URL if your backend is running on a different port or host.*

## Running the Application

### Development Mode

```bash
npm start
# or
yarn start
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
# or
yarn build
```

This builds the app for production to the `build` folder, optimizing the build for the best performance.

## Usage

### User Registration and Login

1. Navigate to the Register page to create a new account
2. Use your email and password to log in
3. Upon successful login, you'll be redirected to the Vote page

### Voting

1. On the Vote page, you can either:
   - Select an existing option from the radio buttons
   - Enter a new option in the text field
2. Click "Submit Vote" to cast your vote
3. You can change your vote at any time by selecting a different option and submitting again

### Admin Features

If your account has admin privileges, you'll have access to:

1. **Results Page**: View the current voting results, including:
   - Total number of votes cast
   - Breakdown of votes by option
   - Percentage of votes for each option

2. **Users Page**: Manage user accounts:
   - View all registered users
   - Delete user accounts

## Project Structure

```
src/
├── components/          # React components
│   ├── api.js           # API service functions
│   ├── AuthContext.js   # Authentication context provider
│   ├── Login.js         # Login component
│   ├── Register.js      # Registration component
│   ├── Results.js       # Voting results component (admin only)
│   ├── Users.js         # User management component (admin only)
│   └── Vote.js          # Voting component
├── App.js               # Main application component with routing
├── index.js             # Application entry point
└── index.css            # Global styles
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
