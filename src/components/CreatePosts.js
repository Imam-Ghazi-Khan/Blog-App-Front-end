// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
// import UserContext from '../utils/UserContext';

// const CreatePosts = () => {

//     const { user } = useContext(UserContext);

//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
   

//   const [formData, setFormData] = useState({
//     title: '',
//     content: ''
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {

//     e.preventDefault();
//     if(user && selectedCategory){
//         try {  
//             const response = await axios.post(`${BASE_URL}/api/user/${user.id}/category/${selectedCategory}/posts`, formData);
//             console.log(response);
//             setMessage('Posted Succesfully');
//             setFormData({ title: '', content: '' });
//           } catch (error) {
//             setError('Error posting');
//           }
//     }else{
//         if(!user)
//         setError('Please login');
//         else if(!selectedCategory)
//         setError('Please select a category');
//         else
//         setError('Some unknown error occured');
//     }
  
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };
  
//   useEffect(()=>{
//     const fetchCategories = async () => {
//         try {
//           const response = await axios.get(`${BASE_URL}/api/categories/`);
//           setCategories(response.data);
//         } catch (error) {
//           console.error('Error fetching categories:', error);
//         }
//       };
//       fetchCategories();
//   },[]);
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 m-20  rounded-lg shadow-md w-full ">
//         <h2 className="text-2xl font-bold mb-6 text-center">CreatePosts</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Title:</label>
//             <input 
//               type="text" 
//               name="title" 
//               value={formData.title} 
//               onChange={handleChange} 
//               required 
//               className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700">Category:</label>
//             <select
//                 className="p-2 border rounded-lg focus:outline-none"
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//             >
//                 <option>Select category</option>
//                 {categories.map(category => (
//                     <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>
//                 ))}
//             </select>
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700">Post:</label>
//             <textarea 
//               name="content" 
//               value={formData.content} 
//               onChange={handleChange} 
//               required 
//               className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             ></textarea>
//           </div>
//           <button 
//             type="submit" 
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//           >
//             Create Post
//           </button>
//         </form>
//         {message && <p className="mt-4 text-center text-green-500">{message}</p>}
//         {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default CreatePosts;


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserContext from '../utils/UserContext';

const CreatePosts = () => {
  const { user } = useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/categories/`, { categoryTitle: newCategory });
      setCategories([...categories, response.data]); // Add the new category to the dropdown
      setNewCategory(''); // Clear the input box
      setMessage('Category added successfully');
      setError('');
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Failed to add category');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && selectedCategory) {
      try {
        const response = await axios.post(`${BASE_URL}/api/user/${user.id}/category/${selectedCategory}/posts`, formData);
        setMessage('Posted Successfully');
        setFormData({ title: '', content: '' });
      } catch (error) {
        setError('Error posting');
      }
    } else {
      if (!user) setError('Please login');
      else if (!selectedCategory) setError('Please select a category');
      else setError('Some unknown error occurred');
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/categories/`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 m-20 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Posts</h2>
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

          <div className="mb-4">
            <label className="block text-gray-700">Category:</label>
            <select
              className="p-2 border rounded-lg focus:outline-none"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option>Select category</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <input 
              type="text" 
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)} 
              placeholder="Add new category" 
              className="p-2 border rounded-lg focus:outline-none flex-grow mr-2"
            />
            <button 
              type="button" 
              onClick={handleAddCategory} 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Add
            </button>
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
            Create Post
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CreatePosts;
