import React, { useState } from "react";
import Axios from "axios";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email : </label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="password">Password : </label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Login</button>
        <p>
          Don't have account? <Link to="/">Sign Up </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
