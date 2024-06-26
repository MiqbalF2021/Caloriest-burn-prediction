import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

const RecordActivity = () => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');
  const [height, setHeight] = useState('');
  const [predictedCalories, setPredictedCalories] = useState(null);
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, weight, user, gender, age, height, id } = data;
      setWeight(weight);
      setGender(gender);
      setAge(age);
      setHeight(height);
      setId(id);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = {
      exercise,
      duration: parseFloat(duration),
      weight: parseFloat(weight),
      gender: gender === 'Male' ? '1' : '0', // Kirim gender sebagai string '1' atau '0'
      age: parseFloat(age),
      height: parseFloat(height),
      heart_rate: 90,  // Nilai tetap untuk heart rate
      temp: 39        // Nilai tetap untuk temperature
    };
  
    try {
      // Mengirim data ke Flask untuk prediksi kalori
      const response = await axios.post("http://localhost:5000/predict", requestData);
      const { predicted_value } = response.data;
      setPredictedCalories(predicted_value);
      toast.success(`Calories burned: ${predicted_value}`, {
        position: "top-right",
      });
  
    } catch (error) {
      console.error("Error making prediction:", error);
      toast.error("Failed to predict calories burned. Try again!");
    }
  };

  const handleBackClick = async () => {
    if (predictedCalories !== null) {
      try {
        // Mengirim data ke Express untuk menyimpan riwayat
        await axios.post("http://localhost:4000/api/saveHistory", {
          exercise: exercise,
          userId: id, // Menggunakan ID pengguna dari respons verifikasi
          caloriesBurn: predictedCalories,
          duration: duration, // Menggunakan predictedCalories dari respons prediksi
        });
        navigate("/");
      } catch (error) {
        console.error("Error saving history:", error);
        toast.error("Failed to save history. Try again!");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-dark">Record New Activity</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between mx-10">
            <div className="flex flex-col justify-center mx-3">
            <div>
              <p className="font-semibold text-dark">Height : <span className="font-bold text-oran">{height}</span></p>
            </div>
            <div>
              <p className="font-semibold text-dark">Gender : <span className="font-bold text-oran">{gender}</span></p>
            </div>
            </div>
            
            <div className="flex flex-col justify-center  mx-3">
            <div>
              <p className="font-semibold text-dark">Weight : <span className="font-bold text-oran">{weight} kg</span></p>
            </div>
            <div>
              <p className="font-semibold text-dark">Age : <span className="font-bold text-oran">{age}</span></p>
            </div>
            </div>
          </div>
          <label className="block">
            Select Activity
            <select
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="w-full bg-oran/0 px-3 py-2 mt-1 text-dark border border-oran rounded-md focus:outline-none focus:ring focus:ring-oran"
              required
            >
              <option value="">Select Activity</option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
              <option value="swimming">Swimming</option>
              <option value="walking">Walking</option>
              <option value="badminton">Badminton</option>
            </select>
          </label>
          <label className="block">
            Duration (minutes):
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-dark border bg-oran/0 border-oran rounded-md focus:outline-none focus:ring focus:ring-oran"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-dark bg-oran rounded-md hover:bg-oran/55 focus:outline-none focus:ring focus:ring-oran"
          >
            Add Activity
          </button>
          {predictedCalories !== null && (
            <div className="mt-4">
              <p className="text-xl text-center">Calories Burned: <span className="font-bold text-green">{predictedCalories}</span></p>
            </div>
          )}
          <div className="flex justify-end">
            <button onClick={handleBackClick} className="text-sm text-dark underline hover:text-orange">
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordActivity;
