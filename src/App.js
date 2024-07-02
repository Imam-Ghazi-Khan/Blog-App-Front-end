import "./App.css"
import { Outlet} from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import { UserProvider } from "./utils/UserContext";

function App() {
  return (
    <div>
      <UserProvider>
        <Header/>
        <Outlet/>
      </UserProvider>
    </div>
  );
}

export default App;


