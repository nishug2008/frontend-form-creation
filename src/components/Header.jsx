import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("Token");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Dashboard
      </h1>

      <div className="flex gap-6 items-center">
        {/* <button
          onClick={() => navigate("/dragdrop-form")}
          className="hover:underline"
        >
          Create Form
        </button> */}

        <button
          onClick={() => navigate("/my-responses")}
          className="hover:underline"
        >
          My Responses
        </button>

    
        <span className="text-sm font-medium">{user?.email}</span>

        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
