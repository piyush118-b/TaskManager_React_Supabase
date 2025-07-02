import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const navigate = useNavigate(); // ✅ create navigate instance

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/auth/signup', {
      email,
      password,
    });
    console.log('User created:', res.data.user);
    alert('Signup successful! Please log in.');
    navigate('/login');
  } catch (err) {
    console.error(err.response?.data?.error || err.message);
    alert(err.response?.data?.error || 'Signup failed');
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
