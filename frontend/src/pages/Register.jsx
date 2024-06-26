import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    age: '',
    height: '',
    weight: '',
    targetWeight: '',
    gender: "",
    email: "",
    password: "",
    username: "",
  });
  const { age, height, weight, targetWeight, gender, email, password, username } = inputValue;

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
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        setAlertMessage("Registration failed: " + message); // Gantikan toast dengan alert
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("An error occurred. Please try again."); // Gantikan toast dengan alert
    }
    setInputValue({
      ...inputValue,
      age: '',
      height: '',
      weight: '',
      targetWeight: '',
      gender: "",
      email: "",
      password: "",
      username: "",
    });
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
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold text-center text-dark">Add Personal Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-dark">Age</label>
            <input
              type="number"
              name="age"
              value={age}
              placeholder="Age"
              onChange={handleOnChange}
              className="w-full px-3 py-2 mt-1 text-dark border border-oran rounded-md focus:outline-none focus:ring focus:ring-oran"
              required
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-dark">Height</label>
            <input
              type="number"
              name="height"
              value={height}
              placeholder="Height"
              onChange={handleOnChange}
              className="w-full px-3 py-2 mt-1 text-dark border border-oran rounded-md focus:outline-none focus:ring focus:ring-oran"
              required
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-dark">Weight</label>
            <input
              type="number"
              name="weight"
              value={weight}
              placeholder="Weight"
              onChange={handleOnChange}
              className="w-full px-3 py-2 mt-1 text-dark border border-oran rounded-md focus:outline-none focus:ring focus:ring-oran"
              required
            />
          </div>
          <div>
            <label htmlFor="targetWeight" className="block text-sm font-medium text-dark">Target Weight</label>
            <input
              type="number"
              name="targetWeight"
              value={targetWeight}
              placeholder="Target Weight"
              onChange={handleOnChange}
              className="w-full px-3 py-2 mt-1 text-dark border border-oran rounded-md focus:outline-none focus:ring focus:ring-oran"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark">Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={handleOnChange}
              className="w-full mt-2 p-2 border border-oran rounded "
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center text-dark">Signup Account</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark">Email</label>
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
            <label htmlFor="username" className="block text-sm font-medium text-dark">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
              className="w-full px-3 py-2 mt-1 text-dark border border-oran rounded-md focus:outline-none focus:ring focus:ring-oran"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark">Password</label>
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
            disabled={loading}>
          {loading ? "Loading..." : "Submit"} 
          </button>
          <span className="block text-sm text-center text-dark">
            Already have an account? <Link to="/login" className="text-oran hover:underline">Login</Link>
          </span>
        </div>
      </div>
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

export default Register;
