import React, { useEffect, useState } from "react";
import axios from "../axios/axiosInstance";
import { Link } from "react-router-dom";
import Header from "./Header";

function AllForms() {
  const [forms, setForms] = useState([]);
  // const [user,setUser]=useState({});

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
        const token=localStorage.getItem("Token");
        console.log(userId);
        // console.log("Fetching from: ", `http://localhost:8080/forms/all/${userId}`);
        const res = (await axios.get(`http://localhost:8080/forms/all/${userId}`,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        }));
        console.log("fetched form" ,res.data);
        setForms(res.data);
      } catch (err) {
        console.error("Failed to fetch forms", err);
      }
    };
    fetchForms();
  }, []);

  return (
    <>
      <Header />
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        Available Forms
      </h2>

      <ul className="space-y-4">
        {forms.map((form) => (
          <li
            key={form.formId}
            className="bg-blue-100 hover:bg-blue-200 transition rounded px-4 py-3 shadow"
          >
            <Link
              to={`/fill-form/${form.formId}`}
              className="text-lg font-medium text-blue-900 hover:underline"
            >
              {form.title || `Untitled Form (${form.formId})`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>

  );
}

export default AllForms;
