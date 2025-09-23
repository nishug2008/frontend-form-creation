import React, { useEffect, useState } from "react";
import axios from "../axios/axiosInstance";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";

function AdminDashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
        const res = await axios.get(`/forms/all/${userId}`);
        setForms(res.data);
      } catch (err) {
        console.error("Failed to fetch forms", err);
      }
    };
    fetchForms();
  }, []);

  return (
    <>
      <AdminHeader />
       <div className="bg-gray-100 min-h-screen text-gray-800 font-sans">
           
      
            {/* Hero Section */}
            <section className="bg-indigo-50 py-20">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-indigo-700">Build Powerful Forms with Ease</h2>
                <p className="mt-4 text-gray-600">
                  Design, share, and analyze forms effortlessly. Whether you're collecting feedback or running surveys, FormEase helps you do it all.
                </p>
                <div className="mt-8">
                  <Link to="/formBuilder" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 shadow">
                    Create Form
                  </Link>
                  <Link to="/my-forms" className="ml-4 border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-100">
                    View My Forms
                  </Link>
                </div>
              </div>
            </section>
      
            {/* Footer */}
            <footer className="bg-white mt-16 py-6 text-center text-gray-500 text-sm">
              © 2025 FormEase. All rights reserved.
            </footer>
          </div>
    </>

  );
}

export default AdminDashboard;
