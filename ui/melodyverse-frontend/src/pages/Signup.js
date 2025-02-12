import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) formData.append("profilePic", profilePic);

      // Send signup request
      await axios.post("http://localhost:5000/api/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Show success message and redirect
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Signup failed! User may already exist.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      {/* Error & Success Messages */}
      {error && <p className="text-red-500 text-sm text-center mb-2" role="alert">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center mb-2">{success}</p>}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Input */}
        <motion.input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
          aria-label="Username"
          whileFocus={{ scale: 1.05 }}
        />

        {/* Email Input */}
        <motion.input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
          aria-label="Email"
          whileFocus={{ scale: 1.05 }}
        />

        {/* Password Input */}
        <motion.input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
          aria-label="Password"
          whileFocus={{ scale: 1.05 }}
        />

        {/* Confirm Password Input */}
        <motion.input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
          aria-label="Confirm Password"
          whileFocus={{ scale: 1.05 }}
        />

        {/* Terms Checkbox */}
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
          <span>I accept the terms and conditions</span>
        </label>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign up
        </motion.button>
      </form>

      {/* Login Redirect */}
      <p className="text-sm text-center mt-4">
        Already have an account? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </motion.div>
  );
}

export default Signup;
