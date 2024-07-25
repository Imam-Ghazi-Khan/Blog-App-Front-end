import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Main from './components/Main';
import PostDetails from './components/PostDetails';
import Profile from './components/Profile';
import CreatePosts from './components/CreatePosts';
import EditPost from './components/EditPost';


const appRouter = createBrowserRouter([
  {
      path:"/",
      element:<App/>,
      children:[
          {
              path:"/",
              element:<Registration/>
          },
          {
            path:"/login",
            element:<Login/>
          },
          {
            path:"/main",
            element:<Main/>
          },
          {
            path:"/createPosts",
            element:<CreatePosts/>
          },
          {
            path:"/editPost/:postId",
            element:<EditPost/>
          },
          {
            path:"/profile/:userId",
            element:<Profile/>
          },
          {
            path:"/posts/:postId",
            element:<PostDetails/>
          },
        ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter}/>
);

