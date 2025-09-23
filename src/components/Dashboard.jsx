import React, { useEffect, useState } from "react";
import axios from "axios"; // customize this path
import { Link } from "react-router-dom";

function Dashboard() {
  const [createdForms, setCreatedForms] = useState([]);
  const [submittedResponses, setSubmittedResponses] = useState([]);
  const [allForms, setAllForms] = useState([]);

  const userId = 1;

  useEffect(() => {
    fetchCreatedForms();
    fetchSubmittedResponses();
    fetchAllForms();
  }, []);

  const fetchCreatedForms = async () => {
    const res = await axios.get(`http://localhost:8080/forms/user/${userId}`);
    setCreatedForms(res.data);
  };

  const fetchSubmittedResponses = async () => {
    const res = await axios.get(`http://localhost:8080/forms/responses/user/${userId}`);
    setSubmittedResponses(res.data);
  };

  const fetchAllForms = async () => {
    const res = await axios.get("http://localhost:8080/forms/all");
    setAllForms(res.data);
  };

  const downloadCSV = (formId) => {
    window.open(`http://localhost:8080/forms/${formId}/responses/csv`, "_blank");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

      {/* Forms Created by You */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Your Created Forms</h2>
        {createdForms.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {createdForms.map((form) => (
              <div
                key={form.id}
                className="p-4 border rounded-lg shadow bg-white flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold">{form.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{form.description}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => downloadCSV(form.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Download CSV
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't created any forms yet.</p>
        )}
      </section>

      {/* Forms You Responded To */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Your Submitted Responses</h2>
        {submittedResponses.length > 0 ? (
          submittedResponses.map((res, index) => (
            <div key={index} className="bg-white p-4 rounded shadow mb-4">
              <h4 className="text-md font-medium">
                Form: {res.form?.title || "Untitled Form"}
              </h4>
              <ul className="text-sm mt-2">
                {res.responseEntries.map((entry, i) => (
                  <li key={i}>
                    <strong>{entry.question.text}:</strong> {entry.answertext}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No responses submitted yet.</p>
        )}
      </section>

      {/* All Available Forms */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Available Forms</h2>
        {allForms.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {allForms.map((form) => (
              <div
                key={form.id}
                className="bg-white p-4 border rounded-lg shadow"
              >
                <h3 className="text-lg font-semibold">{form.title}</h3>
                <p className="text-sm text-gray-500">{form.description}</p>
                <Link
                  to={`/fill-form/${form.id}`}
                  className="inline-block mt-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Fill Form
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No forms available at the moment.</p>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
