import { useState } from "react";
import axios from "axios";
import "./RegisterStyle.css";
import { useNavigate } from "react-router-dom";



function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState(""); 
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

   const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);

      if(!value.endsWith("@gmail.com")){
        setEmailError("Email must end with @gmail.com");
      }
      else{
        setEmailError("")
      }
    };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

     if (firstNameError || lastNameError || emailError) {
      alert("Please fix all errors before submitting");
      return;
    }

    if (password !== repassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role:"CONSUMER"
    };

   

    try {
      const response = await axios.post(`http://localhost:8080/users/register`, formData);
      if (response.status === 200) {
        alert("User is registered");
        navigate("/login")
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error submitting form: ", error);
      alert("Failed to submit Form");
    }
  };

  return (
    <>
      <div className="main">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmitForm} method="post">
          <label htmlFor="firstName">FirstName:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              const value = e.target.value;

              if(/^[a-zA-Z]*$/.test(value) && value.length <= 15){

                setFirstName(e.target.value)
                setFirstNameError("");
              }
              else{
                setFirstNameError("Only letters allowed, max 15 characters");
              }
            }
            }
            maxLength={15}
            minLength={3}
            required
          />

          <label htmlFor="lastName">LastName:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => {
              const value = e.target.value;

              if(/^[a-zA-Z]*$/.test(value) && value.length <= 15){

                setLastName(e.target.value)
                setLastNameError("");
              }
              else{
                setLastNameError("Only letters allowed, max 15 characters");
              }
            }}
          
            maxLength={15}
            minLength={3}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            style={{ borderColor: emailError ? "red" : "" }}
            placeholder="Enter a valid email"
            required
          />

          {emailError && <p style={{ color: "red" }}>{emailError}</p>}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])\S{8,}$"
            title="Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="repassword">Re-type Password:</label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
          />

          <button type="submit">Sign up</button>

          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="../login"
              className="text-blue-500 hover:underline"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;