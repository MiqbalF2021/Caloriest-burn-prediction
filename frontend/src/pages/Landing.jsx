import React from "react";
import { Link } from "react-router-dom";
import bg from '/img/bg.png'

const Landing = () => {
  return (
    <div className="min-h-screen bg-light"> 
      <div className=' w-full py-2 text-oran text-sm font-bold pl-5 md:text-base lg:text-lg'>
        CBP
      </div>
      <div className='flex flex-col-reverse px-auto justify-end pt-10 md:flex-row md:justify-center lg:gap-10'>
      <div className='flex justify-center md:flex-col '>
        <div>
        <h1 className="text-xl lg:text-2xl py-5 pl-8 text-dark font-bold md:py-1">Find Out How Many <span className='text-oran'>Calories</span> You Burn</h1>
        </div>
        <div className='my-6 mr-8 lg:ml-10'>
          <Link to="/login" className="bg-oran px-12 py-3 text-base lg:text-xl font-bold text-dark ml-5 rounded-3xl hover:bg-oran/50 hover:scale-105 delay-150 md:my-1">
            Go
          </Link>
        </div>
      
      </div>
      <div className='self-center md:self-start'>
        <img src={bg} alt="background" className='w-72 lg:w-80' />
      </div>
      </div>
      
    </div>
  );
};

export default Landing;
