import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(UserContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
    setShowMenu(false);
  };

  const handleProfile = () => {
    user.id && navigate(`/profile/${user.id}`);
    setShowMenu(false);
  };

  const handleMain = () => {
    if(user)
    navigate("/main");
    else
    navigate("/login")
  }

  return (
    <header className="bg-gray-800 fixed top-0 left-0 right-0 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 onClick={handleMain} className="text-white text-4xl font-bold cursor-pointer">🧑‍💻</h1>
        <div className="relative">
         
        </div>
        {user && <nav>
            <button onClick={toggleMenu} className="text-white focus:outline-none text-4xl">
            🤓
            </button>
            {showMenu && (
            <div className="absolute top-14 right-0 bg-white shadow-md rounded-lg py-2 w-32 z-10">
              <button onClick={handleProfile} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Profile</button>
              <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Logout</button>
            </div>
            )}
        </nav>}
      </div>
    </header>
  );
};

export default Header;
