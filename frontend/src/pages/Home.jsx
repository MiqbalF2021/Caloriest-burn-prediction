import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import food from '/img/makanan.png'
import { ToastContainer, toast } from "react-toastify";
import foto from '/img/fff.png'
import { format } from 'date-fns'; // Import format function from date-fns

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [history, setHistory] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false);

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
        const { status, user, weight, target, id, age, gender, height } = data;
        if (!status) {
          removeCookie("token");
          navigate("/landing");
          return;
        }
        
        setUsername(user);
        setWeight(weight);
        setTargetWeight(target);
        setGender(gender);
        setAge(age);
        setHeight(height);

        toast(`Hello ${user}`, {
          position: "top-right",
        });

        // Fetch user history to calculate total calories
        const historyData = await axios.get(`https://caloriest-burn-prediction-backend.vercel.app/api/getHistory/${id}`);
        setHistory(historyData.data);

        const totalCaloriesBurned = historyData.data.reduce((total, record) => total + record.caloriesBurn, 0);
        setTotalCalories(totalCaloriesBurned.toFixed(3));

      } catch (error) {
        console.error("Failed to verify cookie or fetch data", error);
        removeCookie("token");
        navigate("/landing");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  
  const toggleShowAllHistory = () => {
    setShowAllHistory(!showAllHistory);
  };

  const Logout = () => {
    removeCookie("token");
    navigate("/landing");
  };
    
  return (
<div className='bg-light w-full min-h-screen'>
  <div className="flex flex-col justify-between pb-20">
    <nav className="w-full text-white flex justify-between text-sm md:text-base lg:text-lg mt-2 fixed">
      <div className="font-bold text-oran ml-3">CBP</div>
      <div className="text-dark font-bold">Welcome, <span className='text-oran'>{username}</span></div>
      <div className="flex items-center">
        <button onClick={Logout} className="flex items-center space-x-2">
          <span className="text-red mr-3 lg:mr-10 font-bold hover:text-dark hover:scale-105 hover:duration-200">Logout</span>
        </button>
      </div>
    </nav>

    <div className="flex flex-col lg:flex-row justify-between gap-7 mt-14 mx-5 lg:mx-10">
      <div className="flex flex-col gap-3 text-dark lg:w-1/2 w-full">
        <div className="bg-oran/20 py-3 rounded shadow w-full flex flex-col lg:flex-row justify-between">
          <div className="lg:w-1/2 w-full ml-5 lg:ml-10 mt-4 font-medium ">
            <h2 className="text-2xl font-extrabold mb-4">Your <span className="text-oran">Info</span></h2>
            <p>Height: <span className="font-bold text-green">{height} cm</span></p>
            <p>Weight: <span className="font-bold text-green">{weight} kg</span></p>
            <p>Target: <span className="font-bold text-green">{targetWeight} kg</span></p>
            <p>Age: <span className="font-bold text-green">{age}</span></p>
            <p className="mb-2">Gender: <span className="font-bold text-green">{gender}</span></p> 
          </div>
          <div className="lg:w-1/3 w-full lg:mr-10 my-3">
            <img src={foto} alt="" className="mx-auto lg:mx-0" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-3 w-full mt-5">
          <div className="w-full bg-green/20 px-5 py-5 rounded-xl mb-5 lg:mb-0">
            <div className="mb-2">
              <h1 className="self-center text-2xl font-extrabold mb-1"><span className="text-green">Nutrition</span> Guide</h1>
            </div>
            <Link to="/guide">
              <img src={food} alt="makanan" className="w-full lg:w-60 hover:scale-105 hover:transition hover:opacity-70" />
            </Link>
          </div>
          <div className="w-full bg-red/20 px-5 py-5 rounded-xl">
            <div className="mb-2">
              <h1 className="self-center text-2xl font-extrabold mb-1 text-red">BMI</h1>
              <p className="font-medium bg-light/20 rounded-lg py-2 px-5 text-base">The BMI or Body Mass Index is a method used to measure and categorize a person's weight based on their height.</p>
            </div>
            <div className="flex justify-end">
              <Link to="/bmi" className="hover:scale-105 hover:transition font-bold px-3 text-light py-3 bg-red rounded-lg hover:bg-red/30 hover:text-red">BMI Check</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green/20 px-5 lg:px-5yy py-8 rounded shadow lg:w-1/3 w-full flex flex-col gap-7 justify-between">
        <div className="font-medium ml-2 lg:ml-6">
          <h2 className="text-2xl text-dark font-extrabold mb-5"><span className="text-green">Activity</span> History</h2>
          {history.length > 0 ? (
            <div>
              {history.slice(0, showAllHistory ? history.length : 3).map((item, index) => (
                <div key={index} className="mb-2 flex gap-2 bg-light/20 rounded-lg py-2 px-5">
                  <div>
                    <h3 className="font-medium">{index + 1}</h3>
                  </div>
                  <div>
                    <p>Activity: <span className="text-green font-bold">{item.exercise}</span></p>
                    <p>Duration: <span className="text-green font-bold">{item.duration} minutes</span></p>
                    <p>Date: <span className="text-green font-medium">{format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss')}</span></p>
                    <p>Calories Burn: <span className="text-green font-bold">{item.caloriesBurn}</span></p>
                  </div>
                </div>
              ))}
              {history.length > 3 && (
                <button onClick={toggleShowAllHistory} className="text-sm text-green underline mt-2">
                  {showAllHistory ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          ) : (
            <p>No activity history found.</p>
          )}
        </div>
      </div>

      <div className="lg:w-1/4 w-full flex flex-col gap-7">
        <div className="px-5 py-7 bg-oran/20 rounded-lg w-full">
          <h2 className="text-2xl text-dark font-extrabold mb-2">Burned <span className="text-oran">Total</span></h2>
          <p className="mb-2"><span className="font-bold text-xl text-green">{totalCalories} kcal</span></p>
        </div>
        <div className="px-5 py-32 bg-oran/0 rounded-lg w-full"></div>
      </div>
    </div>

    <div className="fixed bottom-16 right-7 lg:right-14">
      <Link to="/record" className="flex justify-end text-light font-bold hover:text-green hover:duration-200">
        <div className='bg-green hover:scale-105 hover:transition px-7 py-5 rounded-full hover:bg-opacity-20 hover:duration-200 hover:border-green'>
          <p className='text-2xl font-extrabold'>+</p>
        </div>
      </Link>
    </div>
  </div>
</div>

  );
};

export default Home;
