import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorHandler, setErrorHandler] = useState('')
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://studydex.onrender.com/student/login",
        {
          username,
          password,
        }
      );
      login(response.data.token);
      navigate("/");
    } catch (error) {
      console.error(
        setErrorHandler('User does not exist!')

        // error.response?.data?.message || error.message
      );
    }
      setTimeout(() => {
        setErrorHandler('');
      }, 3000);
  };

  return (
    <form
      className="w-75 p-4 bg-body-secondary shadow rounded"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center">Login Page</h3>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            {errorHandler ? <div className="mt-1 text-danger">{errorHandler}</div> : ''}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          Do not have an account? <Link to='/register'>Sign Up</Link>
        </div>
        <button type="submit" className="btn btn-info offset-3 col-6 text-white">Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
