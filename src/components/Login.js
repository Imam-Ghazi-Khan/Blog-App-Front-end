import React, { useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';

const Login = () => {

    const navigate = useNavigate();

    const { loginUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}/api/users/`);
      const users = response.data;
      const user = users.find(user => user.email === formData.email && user.password === formData.password);
      if (user) {
        setMessage('User logged in successfully');
        loginUser(user);
        navigate("/main");
      } else {
        setMessage('Invalid email or password');
      }
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <p className='mt-4'>New User? <Link to="/" className="text-blue-500">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
