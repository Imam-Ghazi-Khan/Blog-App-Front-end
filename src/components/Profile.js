import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = ()  =>{
    
  }
  
  const handleEdit = () => {
    
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${userId}`);

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/${userId}/posts`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setLoading(false);
      }
    };

    fetchUser();
    fetchPosts();
  }, [userId]);

  return (
    <div className="container mx-auto mt-20">
      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : (
        user && (
          <div className=' m-8'>
            <h2 className="text-3xl font-bold mb-4">{user.name}'s Profile</h2>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <p className="text-lg text-gray-800"><span className="font-bold">Email:</span> {user.email}</p>
              <p className="text-lg text-gray-800 mt-2"><span className="font-bold">About:</span> {user.about}</p>
            </div>
            <h3 className="text-2xl font-bold mb-4">Posts by {user.name}</h3>
            {posts && posts.length > 0 ? (
            <ul className="grid gap-4">
                {posts.map(post => (
                     <li key={post.postId} className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold mb-2">{post.title}</h4>
                        <p className="text-gray-700">{(post.content.length>50)?post.content.slice(0,50)+'...':post.content}</p>
                        <Link to={`/posts/${post.postId}`} className="text-blue-500 hover:underline mt-2">
                        Read more
                        </Link>
                      </div>
                      <div>
                        <button onClick={handleEdit} className='text-3xl'>📝</button>
                        <button onClick={handleDelete}  className='text-3xl'>🗑️</button>
                      </div>
                    </li>
               
                ))}
            </ul>
            ) : (
            <p>No posts found.</p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
