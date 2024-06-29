import React from 'react'
import profile from '/img/profile.png'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const ShowProfile = () => {
    const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "https://caloriest-burn-prediction-backend.vercel.app/",
        {},
        { withCredentials: true }
      );
      const { status, user, weight, target, height, age, gender } = data;
      setUsername(user);
      setWeight(weight);
      setTargetWeight(target);
      setAge(age);
      setGender(gender);
      setHeight(height);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
  <div className='bg-light min-h-screen'>
  <div className='w-full py-2 text-oran text-sm font-bold pl-5 md:text-base lg:text-lg'>
    CBP
  </div>
  <h1 className="flex justify-center text-xl font-bold text-dark pt-5 md:text-2xl lg:text-3xl lg:mb-10">Profile</h1>
  <div className="flex flex-col items-center justify-center font-medium text-dark md:text-base">
    <div className="mt-8 w-full p-4 lg:w-1/2 bg-white rounded shadow">
      <p className="mb-4"><strong>Name:</strong> {username}</p>
      <p className="mb-4"><strong>Age:</strong> {age}</p>
      <p className="mb-4"><strong>Gender:</strong> {gender}</p>
      <p className="mb-4"><strong>Height:</strong> {height}</p>
      <p className="mb-4"><strong>Weight:</strong> {weight}</p>
      <div className='flex justify-between'>
        <button 
        //   onClick={handleEditProfile} 
          className="bg-oran px-5 py-2 mt-5 lg:px-7 lg:py-3 text-sm lg:text-base font-bold text-dark rounded-3xl hover:bg-oran/50 hover:scale-105 delay-150 md:my-1"
        >
          Edit Profile
        </button>
        <button 
          onClick={Logout} 
          className="bg-red px-5 py-2 mt-5 lg:px-7 lg:py-3 text-sm lg:text-base font-bold text-dark rounded-3xl hover:bg-red/50 hover:scale-105 delay-150 md:my-1"
        >
          End
        </button>
      </div>
    </div>
    <button className='mt-4 px-4 py-2 text-dark font-bold rounded-3xl hover:scale-105 delay-150'>
      <Link to="/" className="text-dark text-sm lg:text-base">Back</Link>
    </button>
  </div>
</div>

  )
}

export default ShowProfile