import React,{useEffect,useState} from "react";
import axios from "axios";

function CreatedFormStructure({form}){
  const token = localStorage.getItem("Token")
  const [count,setCount] = useState(0);

  useEffect(() =>{
    const fetchCount = async () => {
        try{
            // @GetMapping("{formId}/response/count")
          const res = await axios.get(`http://localhost:8080/forms/${form.formId}/response/count`,
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
          );

          setCount(res.data)
        }
        catch(error){
          console.log("Exception");
        }

        
    }
    fetchCount();
  },[])



  const handleDownloadCsv = async (formId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/forms/${formId}/responses/csv`,
        {
          responseType: "blob",
           headers: {
          Authorization: `Bearer ${token}`, 
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
     <>
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
              
              <label htmlFor="">{count}</label>
              
            </li>
     </>
    )
}

export default CreatedFormStructure