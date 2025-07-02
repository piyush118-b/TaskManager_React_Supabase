import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="text-center bg-white shadow-xl rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">TaskManager</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Organize your tasks efficiently and stay productive.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/signup">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
