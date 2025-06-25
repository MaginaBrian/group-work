Blog App Frontend
A modern, responsive frontend for a blog application, built with React, Vite, Tailwind CSS, and React Router, integrated with a Flask API for managing blog posts, comments, user authentication, profiles, and search functionality.
🚀 Features

Register and login users with JWT-based authentication (access and refresh tokens)
Create, view, edit, and delete blog posts (authenticated users only)
Add, view, and delete comments on blog posts
Search blog posts by title or content
View and update user profiles (username and email)
Responsive design with Tailwind CSS
WCAG-compliant accessibility with ARIA labels and semantic HTML
Error handling for API requests with token refresh on 401 errors
Protected routes for authenticated users
Unit tests for login functionality

🛠 Technologies Used

JavaScript (ES Modules)
React 18
Vite
Tailwind CSS (via CDN)
React Router
Jest and React Testing Library (for unit tests)
Postman (for API testing)

📁 Project Structure
client/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── BlogForm.jsx
│   │   ├── BlogList.jsx
│   │   ├── BlogPost.jsx
│   │   ├── CommentSection.jsx
│   │   ├── Login.test.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── index.html
├── package.json
├── vite.config.js

⚙️ Setup Instructions

Clone the repository:
git clone https://github.com/your-username/blog-app.git
cd blog-app/client


Install dependencies:
npm install


Set environment variables:Create a .env file in the client/ directory and add:
VITE_API_URL=http://localhost:5000

This points to the backend API. Update the URL if your backend runs on a different port or host.

Run the development server:
npm run dev

The app will be available at http://localhost:5173 (or the port shown by Vite).

Ensure the backend is running:Follow the backend setup instructions in the backend/README.md to start the Flask API at http://localhost:5000. Key steps:

Set up a virtual environment: python -m venv venv && source venv/bin/activate
Install dependencies: pip install -r requirements.txt
Set environment variables: export FLASK_APP=app.py and export DATABASE_URL=sqlite:///blog.db
Run migrations: flask db upgrade
Seed the database: python seed.py
Start the server: flask run


Run tests (optional):
npm test

This runs unit tests (e.g., Login.test.jsx) using Jest and React Testing Library.


🔐 Authentication Flow

Register: Navigate to /register to create a new user with a username, email, and password. Stores JWT access and refresh tokens in localStorage.
Login: Navigate to /login to authenticate with username and password, receiving JWT tokens.
Token Refresh: Automatically refreshes access token on 401 errors using /api/refresh.
Protected Routes: Authenticated users can access:
Create, edit, delete posts, and view comments at /
View and update profile at /profile


Logout: Clears JWT tokens and redirects to /login.

📬 Frontend Routes



Path
Auth Required?
Description



/
Yes
Home page with blog posts, form, and comments


/register
No
Register a new user


/login
No
Login to authenticate


/profile
Yes
View and update user profile


🖼 UI Components

Navbar: Displays navigation links (Home, Profile, Logout if authenticated; Login, Register if not) and a search bar for authenticated users.
Login: Interface for user authentication with username and password.
Register: Interface for user registration with username, email, and password.
Profile: Displays and allows updating of user details (username, email).
BlogForm: Form for creating new blog posts.
BlogList: Displays a list of blog posts.
BlogPost: Displays individual posts with edit/delete options and comments.
CommentSection: Allows adding, viewing, and deleting comments on posts.

🎨 Styling

Uses Tailwind CSS (via CDN) for responsive, utility-first styling.
Custom styles in src/index.css for blog-specific components (e.g., forms, posts, comments).
Mobile-first design with responsive layouts for all screen sizes.
WCAG compliance with ARIA labels, semantic HTML (<section>, <main>, <article>), and keyboard navigation.

🧪 Testing

Unit tests in src/components/Login.test.jsx verify login form rendering, submission, and error handling.
Uses Jest and React Testing Library.
Test API endpoints with Postman to ensure backend compatibility before running the frontend.

Sample Postman Requests:

POST /api/register: { "username": "testuser", "email": "test@example.com", "password": "Password123" }
POST /api/login: { "username": "testuser", "password": "Password123" }
GET /api/posts: Requires Authorization: Bearer <access_token>
POST /api/comments/<post_id>: { "content": "Great post!" } (requires auth)
GET /api/search?q=<query>: Requires auth

♿ Accessibility

Semantic HTML (<section>, <main>, <article>) for better structure.
ARIA labels on inputs, buttons, and navigation for screen reader support.
Keyboard navigation supported for all interactive elements.
High-contrast Tailwind classes for visual accessibility.

🔗 Backend Integration

Communicates with Flask API at http://localhost:5000/api.
Endpoints used:
/register, /login, /logout, /refresh, /posts, /posts/<id> (from app.py)
/comments/<post_id>, /comments/<post_id>/<id>, /profile, /search (from blueprints)



📝 Notes

Ensure the backend is running before starting the frontend to avoid API errors.
The frontend uses localStorage for JWT tokens; ensure secure handling in production.
For production, consider replacing CDN dependencies with local installations via npm.
Additional tests for other components (BlogPost, CommentSection, etc.) can be added for better coverage.

🚀 Deployment

Frontend: Deploy to Vercel by pushing the client/ directory to a Vercel project. Set the VITE_API_URL environment variable to the backend URL.
Backend: Deploy to Render, ensuring the DATABASE_URL and other environment variables are configured.

