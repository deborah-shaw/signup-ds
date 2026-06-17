# 📝 Sign-Up Page (Full Stack Authentication App)

A responsive **full-stack authentication app** built with vanilla JavaScript, Node.js, Express, and MongoDB.
This project implements a real-world user flow including **registration, login, JWT authentication, and protected profile access**.

## 🚀 Live Demo

👉 Frontend: [here](https://deborah-shaw.github.io/Sign-Up-Page/)  
👉 Backend: (to be deployed — e.g. Render)

## 🕹️ Features

- 🧑‍💻 Sign-Up System:
  - Collects user information:
    - First Name, Last Name
    - Gender
    - ZIP code → auto-fetch city, latitude, longitude
    - State & county (dynamic API)
    - Username (unique)
    - Email (unique)
    - Password + confirmation
- 🔐 Authentication System (JWT)
  - Secure login with credential verification
  - Password hashing using bcrypt
  - JWT-based authentication
  - Token stored in `localStorage`
  - Protected routes using middleware
  - Logout functionality
- ⚡ Validation (Frontend + Backend)
  - Username availability check (database-backed validation)
  - Email uniqueness check (database-backed validation)
  - Password requirements:
    - Minimum 8 characters
    - Uppercase + lowercase
    - Number + special character
    - No whitespace
  - Real-time password checklist + strength bar
  - Confirm password validation
  - Required field validation
- 📄 Profile Page
  - Displays authenticated user data:
    - Name, username, email
    - Gender (formatted: Male/Female)
    - Location (city, state, zip, coordinates)
  - Handles missing data → shows “No info”
  - Protected route (JWT required)
  - Auto-redirect if not logged in
- 🛡️ Security Features
  - Password hashing (bcrypt)
  - JWT authentication (stateless sessions)
  - Protected API endpoints
  - Duplicate username/email prevention
  - Sensitive data excluded (`-password`)
- 🎨 UI / UX
  - Responsive design (mobile + desktop)
  - Clean centered card layout
  - Password visibility toggle 👁
  - Real-time validation feedback
  - Smooth user flow (signup → login → profile)

## 🗂️ Project Structure

```
📦 sign-up-page/
 ┣ client/
 ┃ ┣ 📁 css/
 ┃ ┃ ┗ 📄 style.css           # Styling for layout and form
 ┃ ┣ 📁 img/
 ┃ ┃ ┗ 📄 usa.jpg             # Background image
 ┃ ┣ 📁 js/
 ┃ ┃ ┣ 📄 index.js            # Signup logic
 ┃ ┃ ┣ 📄 login.js            # Login logic
 ┃ ┃ ┗ 📄 profile.js          # Profile page logic
 ┃ ┣ 📄 index.html            # Signup page
 ┃ ┣ 📄 login.html            # Login page
 ┃ ┗ 📄 profile.html          # User dashboard
 ┃
 ┣ server/
 ┃ ┣ 📁 models/
 ┃ ┃ ┗ User.js                # Mongoose schema
 ┃ ┣ package.json             # Project metadata + dependencies + npm scripts
 ┃ ┣ package-lock.json        # Locks exact dependency versions for consistency
 ┃ ┣ server.js                # Express backend server
 ┃ ┗ .env                     # Holds sensitive config like MongoDB URI and API keys
 ┃
 ┗ 📄 README.md               # Project documentation
```

## 🛠️ Tech Used

### Frontend  
- HTML5, CSS3, JavaScript
- Fetch API

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- bcrypt
- JSON Web Tokens (JWT)
- dotenv
- CORS

## 🔄 Application Flow
Sign Up → MongoDB  
   ↓  
Login → Verify credentials  
   ↓  
JWT Token issued  
   ↓  
Frontend stores token  
   ↓  
Access protected routes (/profile)  
   ↓  
Logout → remove token

## ✅ How It Works

1. User fills out the sign-up form
2. ZIP code triggers external API call → displays:
  - City
  - Latitude
  - Longitude
3. State selection loads counties dynamically via API
4. Username and email are checked in real-time:
  - Frontend sends request to backend (/check-username, /check-email)
  - Backend queries MongoDB to verify availability
5. Password updates in real-time:
    - checklist ✔ / ❌
    - strength bar 🔋
6. On form submit:
    - JavaScript prevents default submission
    - Runs all validations (password + confirm password)
    - Sends POST request to backend:
      ```
      fetch("http://localhost:3000/signup")
      ```
7. Start the backend server  
Before submitting the form, you must start the backend:
      ```
      cd backend
      npm install
      node server.js
      ```  
8. Backend processing:
    - Checks missing fields
    - Prevents duplicate usernames
    - Validates password strength
    - Hashes password using bcrypt
9. Success response
    - User is redirected to `login.html`

## 🧪 API Endpoint
### POST `/signup`
#### Creates a new user

### POST `/login`
#### Authenticate user → returns JWT

### GET `/profile`
#### Protected route (requires token)

### GET `/check-username`
#### Check username availability

### GET `/check-email`
#### Check email availability

## ⚙️ Environment Variables
Create a `.env` file in `/server`:
```
MONGO_URI=mongodb_connection
JWT_SECRET=secret_key
```

## 🧠 Concepts Demonstrated

- Full-stack architecture
- REST API design
- JWT authentication
- Middleware (Express)
- Async/await + Fetch API
- Form validation (client + server)
- Password security (bcrypt)
- Environment variables

## 📱 Compatibility

- Works on all modern browsers: Chrome, Firefox, Edge, Safari, Mobile browsers

## 💡 Future Improvements

- Token expiration handling (auto logout)
- Refresh tokens
- Email verification (SendGrid)
- Password reset system
- Edit profile feature
- Role-based access (admin/user)
- Improved accessibility (ARIA)

## 📄 License

This project is licensed under the MIT License.