import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useParams } from 'react-router-dom';
import UserContext from '../utils/UserContext';

const EditPost = () => {

  const { postId } = useParams();
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
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
    if(user){
        try {  
            const response = await axios.put(`${BASE_URL}/api/posts/${postId}`,formData);            
            console.log(response);
            setMessage('Posted Succesfully');
            setFormData({ title: '', content: '' });
          } catch (error) {
            setError('Error posting');
          }
    }else{
        if(!user)
        setError('Please login');
        else
        setError('Some unknown error occured');
    }
  
  };

  
   useEffect(() => {

    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/posts/${postId}`);
        setFormData({
          title: response.data.title,
          content: response.data.content
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Error fetching post data');
      }
    };

    fetchPostData();
  }, [postId]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 m-20  rounded-lg shadow-md w-full ">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title:</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>


          <div className="mb-6">
            <label className="block text-gray-700">Post:</label>
            <textarea 
              name="content" 
              value={formData.content} 
              onChange={handleChange} 
              required 
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Edit Post
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default EditPost;
