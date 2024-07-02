import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/posts/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="container mx-auto mt-8">
      {loading ? (
        <p>Loading...</p>
      ) : (
        post ? (
          <div className="bg-white p-8 m-20 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <p className="text-sm text-gray-600">Category: {post.category.categoryTitle}</p>
            <p className="text-sm text-gray-600">Posted by: {post.user.name}</p>
          </div>
        ) : (
          <p>Post not found.</p>
        )
      )}
    </div>
  );
};

export default PostDetails;
