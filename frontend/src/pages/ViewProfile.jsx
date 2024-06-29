import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const ViewProfile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/landing");
        return;
      }
      try {
        const { data } = await axios.post(
          "https://caloriest-burn-prediction-backend.vercel.app/",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        if (status) {
          setUsername(user);
          const profileResponse = await axios.get(
            `https://caloriest-burn-prediction-backend.vercel.app/api/userProfile/${user}`,
            { withCredentials: true }
          );
          setProfile(profileResponse.data);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <div className="bg-light min-h-screen">
        <div className=' w-full py-2 text-oran text-sm font-bold pl-5 md:text-base lg:text-lg'>
        CBP
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Profile of {username}</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Age: {profile.age}</p>
          <p>Gender: {profile.gender}</p>
          <p>Height: {profile.height} cm</p>
          <p>Weight: {profile.weight} kg</p>
          <p>Favorite Activity: {profile.favoriteActivity}</p>
        </div>
        <Link className="bg-oran text-dark px-5 py-2 font-bold mt-3 rounded-md hover:bg-oran/55" to="/">Back</Link>
      </div>

    </div>
  );
};

export default ViewProfile;
