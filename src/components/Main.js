import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [pageNumbers,setPageNumbers] = useState([0,1,2,3,4,5,6,7,8,9,10]);
  // const [pageSizes,setPageSizes] = useState([10,15,20,25,30,35,40,45,50]);
  const pageNumbers = [0,1,2,3,4,5,6,7,8,9,10];
  const pageSizes = [10,15,20,25,30,35,40,45,50];
  const [pageNumber,setPageNumber] = useState(pageNumbers[0]);
  const [pageSize,setPageSize] = useState(pageSizes[0]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        setPosts(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/categories/`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchPosts();
    fetchCategories();
  }, [pageNumber,pageSize]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePageNumberChange = (event) => {
    setPageNumber(event.target.value)
  }

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value)
  }

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category.categoryTitle === selectedCategory)
    : posts;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-20 m-8">Blogs</h1>
      <div className="flex items-center justify-between m-8">


        

      <div>
        <select
          className="p-2 border rounded-lg focus:outline-none"
          value={pageNumber}
          onChange={handlePageNumberChange}
        >
          {pageNumbers.map(page => (
            <option key={page} value={page}>Page {page}</option>
          ))}
        </select>
        </div>


        <div>
        <select
          className="p-2 border rounded-lg focus:outline-none"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.categoryId} value={category.categoryTitle}>{category.categoryTitle}</option>
          ))}
        </select>
        </div>

        <div>
        <select
          className="p-2 border rounded-lg focus:outline-none"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {pageSizes.map(pageSize => (
            <option key={pageSize} value={pageSize}>Page Limit {pageSize}</option>
          ))}
        </select>
        </div>

      </div>

      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
          {filteredPosts.map(post => (
            <div key={post.postId} className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{(post.content.length>50)?post.content.slice(0,50)+'...':post.content}</p>
              <Link to={`/posts/${post.postId}`} className="text-blue-500 hover:underline">Read more</Link>
            </div>
          ))}
        </div>
      )}
      <Link to={`/createPosts`}>
        <div className='cursor-pointer fixed right-20 bottom-20 text-4xl'>
          ➕
        </div>
      </Link>
    </div>
  );
};

export default Main;
