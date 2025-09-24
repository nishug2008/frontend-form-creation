import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FillForm = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [ form, setForm ] = useState(null);
  const [answers, setAnswers] = useState({});
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userId = user?.id;
  const email = user.email;
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        //form
        const res = await axios.get(`http://localhost:8080/forms/${formId}`, {
         headers: {
        "Authorization": `Bearer ${token}`,
        // "Content-Type": "application/json"
      }
    }
        );
        setForm(res.data);
      } catch (err) {
        console.error("Error fetching form", err);
      }
    };

    fetchForm();
  }, [formId]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userId || "no user ID");
    console.log(localStorage.getItem("userInfo"));

    console.log("+++++++++++++++++++" ,answers || "Not found");
    try {
      console.log(token);
      await axios.post(
        `http://localhost:8080/responses/submit/${formId}`, answers, {
         headers: {
        "Authorization": `Bearer ${token}`,
        // "Content-Type": "application/json"
      }}

      );

      navigate("/all-forms")
      alert("Form Submitted Successfully");

    } catch (err) {
      alert("Error submitting form");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{form.title}</h2>
        <p className="text-gray-600 mb-6">{form.description}</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {form.questions.map((question) => (
            <div key={question.questionId}> 
              <label className="block font-medium mb-2">{question.text}</label>
              {question.type === "text" ? (
                <input  
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  onChange={(e) => handleChange(question.questionId, e.target.value)}
                  required
                />
              ) : (
                question.options.map((opt) => (
                  <div key={opt.option_id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`q-${question.questionId}`}
                      value={opt.value}
                      onChange={(e) =>
                        handleChange(question.questionId, e.target.value)
                      }
                      required
                    />
                    <label>{opt.value}</label>
                  </div>
                ))
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};


export default FillForm