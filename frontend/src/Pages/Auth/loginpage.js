import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await Axios.post('/api/users/signin', {
//         email,
//         password,
//       });
//       ctxDispatch({ type: 'USER_SIGNIN', payload: data });
//       localStorage.setItem('userInfo', JSON.stringify(data));
//       navigate(redirect || '/');
//     } catch (err) {
//       toast.error(getError(err));
//     }
//   };

  useEffect(() => {
  }, [navigate, redirect]);

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-900">
  <div className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-md shadow-md h-[50vh]">
    <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>
    <form className="space-y-4">
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
          className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mt-16"
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
    </form>
  </div>
</div>

  );
}
