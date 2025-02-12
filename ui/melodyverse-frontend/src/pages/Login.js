import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  // State for user inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });

      // Store token and redirect
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center" role="alert">{error}</p>}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </form>

      {/* Signup Redirect */}
      <p className="text-sm text-center mt-4">
        Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
      </p>
    </motion.div>
  );
}

export default Login;
