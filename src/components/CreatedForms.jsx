// import React, { useEffect, useState } from "react";
// import axios from "../axios/axiosInstance";

// function CreatedForms() {
//   const [forms, setForms] = useState([]);

//   useEffect(() => {
//     const fetchForms = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const userId = user?.id;

//         const res = await axios.get(`http://localhost:8080/forms/user/${userId}`);

//         setForms(res.data);
  
//       } catch (err) {
//         console.error("Error fetching forms:", err);
//       }
//     };

//     fetchForms();
//   }, []);


//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
//         Created Forms
//       </h2>

//       <ul className="space-y-4">
//         {forms.map((form) => (
//           <li
//             key={form.formId}
//             className="bg-blue-100 hover:bg-blue-200 transition rounded px-4 py-3 shadow"
//           >
//             {form.title || `Untitled Form (${form.formId})`}




//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CreatedForms;


import React, { useEffect, useState } from "react";
import axios from "../axios/axiosInstance";

function CreatedForms() {
  const [forms, setForms] = useState([]);
  const token = localStorage.getItem("Token")

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        // const userId = user?.id;
        const email = user.email;
         
        const res = await axios.get(`http://localhost:8080/forms/user`,
          {
         headers: {
        "Authorization": `Bearer ${token}`,
      }}
        );
        setForms(res.data);
      } catch (err) {
        console.error("Error fetching forms:", err);
      }
    };

    fetchForms();
  }, []);

  const handleDownloadCsv = async (formId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/forms/${formId}/responses/csv`,
        {
          responseType: "blob", // important for downloading files
           headers: {
          Authorization: `Bearer ${token}`, // add your JWT token here
          // any other headers if needed
        },
        },
       
      );

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `form_${formId}_responses.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading CSV:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        📋 Created Forms
      </h2>

      {forms.length === 0 ? (
        <p className="text-center text-gray-500">No forms created yet.</p>
      ) : (
        <ul className="space-y-6">
          {forms.map((form) => (
            <li
              key={form.formId}
              className="flex justify-between items-center bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 shadow-sm hover:shadow-md transition"
            >
              <span className="text-lg font-medium text-gray-800">
                {form.title || `Untitled Form (${form.formId})`}
              </span>
              <button
                onClick={() => handleDownloadCsv(form.formId)}
                className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition"
              >
                ⬇️ Download CSV
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CreatedForms;
