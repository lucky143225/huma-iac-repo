import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from "react-toastify";

export default function SigninScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const port = process.env.REACT_APP_BACKEND_PORT || "localhost:3000";

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://${port}/api/users/login`, {
        email,
        password,
      });
      toast.success("Logged In Successfully")
      localStorage.setItem('userInfo', JSON.stringify({ firstname: data.user.firstName, lastname: data.user.lastName, email: data.user.email }));
      navigate( '/');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
  }, [navigate]);

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-900">
  <div className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-md shadow-md h-[50vh]">
    <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>
    <div className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="mt-3 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          className="mt-3 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full py-1 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mt-16"
          onClick = {submitHandler}
        >
          Login
        </button>
      </div>
      <div className="text-sm text-center text-gray-400">
        New User?{' '}
        <Link
          to={`/signup`}
          className="text-blue-500 hover:underline"
        >
          Create your account
        </Link>
      </div>
    </div>
  </div>
</div>

  );
}
