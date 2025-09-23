import { useState } from "react";
import axios from "axios";
import "./FormBuilder.css";
import { useNavigate } from "react-router-dom";


function FormBuilder() {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("Add your form description here ...");
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    {
      text: "",
      type: "text",
      options: [],
    },
  ]);


  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;

    // Clear options if type is changed to 'text'
    if (field === "type" && value === "text") {
      updatedQuestions[index].options = [];
    }
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = { value };
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({ value: "" });
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        type: "text",
        options: [],
      },
    ]);
  };

  const handleSubmitForm = async () => {
    const formData = {
      title: formTitle,
      description: formDescription,
      questions: questions,
    };

    try {
      const user = JSON.parse(localStorage.getItem("user")); // Replace with real ID or fetch from localStorage/session
      const userId = user?.id;
      const response = await axios.post(`http://localhost:8080/forms/create/${userId}`, formData);
      console.log(response);
      if (response.status === 200) {
        alert("Form submitted successfully!");
        navigate("/all-forms")

        console.log(response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form.");
    }
  };

  return (
    <div className="form-box">
      {/* Header Section */}
      <div className="form-header">
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="form-title-input"
        />
        <textarea
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          className="form-description-input"
          rows={2}
        />
      </div>

      {/* Questions Section */}
      <div className="form-body">
        {questions.map((q, index) => (
          <div key={index} className="question-block">

            <label>Enter your question</label>
            <div className="question-row">
              <input
                type="text"
                placeholder="Type your question here"
                value={q.text}
                onChange={(e) =>
                  handleQuestionChange(index, "text", e.target.value)
                }
              />
              <select
                value={q.type}
                onChange={(e) =>
                  handleQuestionChange(index, "type", e.target.value)
                }
                className="question-type-selector"
              >
                <option value="text">Text</option>
                <option value="checkbox">Checkbox</option>
                <option value="dropdown">Dropdown</option>
              </select>
            </div>

            {(q.type === "checkbox" || q.type === "dropdown") && (
              <div className="option-section">
                <label>Options:</label>
                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={opt.value}
                    onChange={(e) =>
                      handleOptionChange(index, oIndex, e.target.value)
                    }
                  />
                ))}
                <button onClick={() => addOption(index)}>+ Add Option</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Question Button */}
      <div className="add-question-button" onClick={addQuestion}>
        +
      </div>

      {/* Submit Button */}
      <button className="submit-button" onClick={handleSubmitForm}>
        Submit Form
      </button>
    </div>
  );
}


export default FormBuilder;

