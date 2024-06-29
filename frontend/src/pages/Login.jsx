import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "./CustomAlert";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { email, password } = inputValue;
  const [alertMessage, setAlertMessage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://caloriest-burn-prediction-backend.vercel.app/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        setAlertMessage("Login failed: " + message);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("An error occurred. Please try again.");
    }
    setLoading(false);
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
    <div className={`w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md ${loading ? "blur-sm" : ""}`}>
      <h2 className="text-2xl font-bold text-center text-dark">Login Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="w-full px-3 py-2 mt-1 text-dark border border-oran rounded-md focus:outline-none focus:ring focus:ring-oran"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-dark">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            className="w-full px-3 py-2 mt-1 text-dark border border-oran rounded-md focus:outline-none focus:ring focus:ring-oran"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-light bg-oran rounded-md hover:bg-oran/55 focus:outline-none focus:ring focus:ring-oran"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <span className="block text-sm text-center text-dark">
          Don't have an account? <Link to="/register" className="text-oran hover:underline">Signup</Link>
        </span>
      </form>
    </div>
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center bg-light bg-opacity-60">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-oran/20 h-16 w-16"></div>
      </div>
    )}
    {alertMessage && (
        <CustomAlert message={alertMessage} onClose={() => setAlertMessage("")} />
      )}
  </div>
);
};

export default Login;
