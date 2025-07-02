import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/auth/login', {
      email,
      password,
    });
    console.log('Logged in:', res.data);
    // Save token or session if needed
    navigate('/tasks');
  } catch (err) {
    console.error(err.response?.data?.error || err.message);
    alert(err.response?.data?.error || 'Login failed');
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
