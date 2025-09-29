import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toaster from "../toast/Toaster";
import Modal from "../modal_popup/Modal"; // adjust path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email, "Password:", password);

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/users/login`,
        loginData
      );
      if (response.status == 200) {
        const user = response.data;
        alert("Loged In");
        localStorage.setItem("userInfo",JSON.stringify(user));
        localStorage.setItem("Token",user.token);
        
        console.log(loginData);
        console.log(user);

        console.log(user.role)
        if(user.role == "ADMIN"){
          navigate("/admin-dashboard")
        }else{
          navigate("/all-forms"); 
        }
      }
      Toaster.success("Failed to Login");

    } catch (error) {
      console.log("Error in login");
      setEmail("");
      setPassword("");
      setModalMessage("Login failed. Please check your credentials.");
      setIsOpen(true);
      // alert("Failed to Login ");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Login Box */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Forgot Password & Sign Up Links */}
        <div className="text-center mt-4 text-sm">
          <p className="text-gray-600">
            Forgot password?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Reset here
            </a>
          </p>
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="../register"
              className="text-blue-500 hover:underline"
              onClick={() => {
                navigate("/Register");
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={modalMessage}
      />
    </div>



  );
};

export default Login;
