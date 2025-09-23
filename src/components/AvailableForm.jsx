import React , {useEffect, useState} from "react";
import axios from "../axios/axiosInstance";
import {Link} from "react-router-dom";
import Header from "./Header";

function AvailableForm(){
  return (
    <>
     <Header />
     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        Available Forms
      </h2>

      
      <ul className="space-y-4">
        {forms.map((form) => {})}
      </ul>
    </>
  )
}

export default AvailableForm;