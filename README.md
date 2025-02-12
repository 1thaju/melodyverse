🎵 MelodyVerse - Authentication App
A full-stack authentication system built with React.js, Node.js, Express, and MongoDB using JWT authentication.

📌 Features
✅ User Signup & Login with JWT authentication
✅ Password Hashing with bcryptjs
✅ Token-based Authentication (JWT)
✅ Profile Picture Upload with Multer
✅ Form Validation using React State
✅ Protected Routes in React
✅ Error Handling & Edge Cases Covered

🛠️ Tech Stack
 -> Frontend 🖥️
React.js (State management with Context API)
Tailwind CSS for styling
Framer Motion for animations
Axios for API requests
 -> Backend 🔧
Node.js with Express
MongoDB with Mongoose
JWT for authentication
Bcrypt.js for password hashing
Multer for image uploads
Express-rate-limit to prevent brute force attacks

📂 Project Structure
bash
Copy
Edit
melodyverse/
│── backend/                 # Express Backend
│   ├── models/              # Mongoose Models
│   │   ├── User.js
│   ├── routes/              # API Routes
│   │   ├── auth.js
│   ├── middleware/          # Authentication Middleware
│   │   ├── authMiddleware.js
│   ├── uploads/             # User Profile Pictures
│   ├── .env                 # Environment Variables
│   ├── server.js            # Express Server
│── frontend/                # React Frontend
│   ├── src/
│   │   ├── pages/           # Login, Signup, Home
│   │   ├── App.js           # Main App Component
│   ├── public/
│   ├── .env                 # Frontend API URL
│── README.md                # Project Documentation



🛡️ Error Handling & Edge Cases
✅ Validation Errors: Missing fields return 400 Bad Request
✅ Duplicate Emails: Trying to signup with an existing email returns 409 Conflict
✅ Incorrect Passwords: Login with a wrong password returns 401 Unauthorized
✅ Expired JWT Tokens: Accessing protected routes with an expired token returns 403 Forbidden

🎨 Styling & UI
Tailwind CSS for a modern and responsive UI
Framer Motion for smooth animations
Accessible components with ARIA attributes

🎯 Security Best Practices
✅ JWT-based authentication to secure API endpoints
✅ Rate-limiting to prevent brute force attacks
✅ Password hashing using bcryptjs
✅ Helmet.js to set secure HTTP headers
