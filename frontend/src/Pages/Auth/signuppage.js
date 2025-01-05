
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';


export default function SignupScreen() {
  const navigate = useNavigate();

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const submitHandler = async (e) => {
    e.preventDefault();

    const port = process.env.REACT_APP_BACKEND_PORT || "localhost:3000";
    
    console.log('Submit triggered');
    console.log(port);
    
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post(`http://${port}/api/users/register`, {
        username,
        email,
        password,
      });
      console.log('API Response:', data);
      localStorage.setItem('userInfo', JSON.stringify({ name: data.user.username, email: data.user.email }));
      navigate('/home');
    } catch (err) {
      console.error('API Error:', err);
    }
  
  };

  useEffect(() => {
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-md p-8 shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h1>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Register
            </button>
          </div>

          <div className="text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link to={`/login`} className="text-blue-500 hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
