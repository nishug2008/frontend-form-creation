import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import "./DragDropFormBuilder.css";

const ItemTypes = {
  FIELD: "field",
};

const ToolboxItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FIELD,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`toolbox-item ${isDragging ? "dragging" : ""}`}>
      {label}
    </div>
  );
};

function DragDropFormBuilder() {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("Add your form description here ...");
  const [questions, setQuestions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showPermission, setShowPermission] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user list for permissions
     axios.get("http://localhost:8080/users/all")
      .then((res) => {
        setAllUsers(res.data);
        console.log(allUsers);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching users", err));


  }, []);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.FIELD,
    drop: (item) => {
      const newQuestion = {
        text: "",
        type: item.type,
        options: item.type === "text" ? [] : [{ value: "" }],
      };
      setQuestions((prev) => [...prev, newQuestion]);
    },
  }));

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    if (field === "type") {
      updated[index].options = value === "text" ? [] : [{ value: "" }];
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].value = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push({ value: "" });
    setQuestions(updated);
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

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmitForm = async () => {
    const formData = {
      formTitle: formTitle,
      formDescription: formDescription,
      questions,
      permittedUserIds: selectedUsers,
    };

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      console.log(formData);
      const response = await axios.post(`http://localhost:8080/forms/create/${userId}`, formData);
      if (response.status === 200) {
        alert("Form submitted successfully!");
        navigate("/all-forms");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form.");
    }
  };

  return (
    <div className="form-builder-container">
      {/* Toolbox */}
      <div className="toolbox">
        <h3>Toolbox</h3>
        <ToolboxItem type="text" label="Text Input" />
        <ToolboxItem type="checkbox" label="Checkbox" />
        <ToolboxItem type="dropdown" label="Dropdown" />
      </div>

      {/* Form Canvas */}
      <div className="form-canvas" ref={drop}>
        <input
          type="text"
          className="form-title-input"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
        <textarea
          className="form-description-input"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          rows={2}
        />

        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <label>Question {index + 1}</label>
            <input
              type="text"
              placeholder="Type your question here"
              value={q.text}
              onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
            />
            <select
              value={q.type}
              onChange={(e) => handleQuestionChange(index, "type", e.target.value)}
            >
              <option value="text">Text</option>
              <option value="checkbox">Checkbox</option>
              <option value="dropdown">Dropdown</option>
            </select>

            {(q.type === "checkbox" || q.type === "dropdown") && (
              <div className="option-section">
                <label>Options:</label>
                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={opt.value}
                    onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                  />
                ))}
                <button className="add-option-button" onClick={() => addOption(index)}>
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <button className="add-question-button" onClick={addQuestion}>
          + Add Question
        </button>

        <button
          className="add-question-button"
          onClick={() => setShowPermission((prev) => !prev)}
        >
          🔒 Give Permission
        </button>

        {showPermission && (
          <div className="permission-section">
            <h4>Select users to give form access:</h4>
            <ul className="user-list">
              {allUsers.map((user) => (
                <li key={user.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                    />
                    {user.name || user.email}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="submit-button" onClick={handleSubmitForm}>
          Submit Form
        </button>
      </div>
    </div>
  );
}

export default DragDropFormBuilder;
