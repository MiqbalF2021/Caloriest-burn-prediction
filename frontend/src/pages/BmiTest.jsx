import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function BMICalculator() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [bmiCategory, setBMICategory] = useState('');
  
    const calculateBMI = () => {
      if (height && weight) {
        const heightInMeters = height / 100; // Convert height from cm to m
        const bmiResult = weight / (heightInMeters * heightInMeters);
        setBMI(bmiResult.toFixed(2));
  
        // Determine BMI category
        if (bmiResult < 18.5) {
          setBMICategory('Underweight');
        } else if (bmiResult >= 18.5 && bmiResult <= 24.9) {
          setBMICategory('Normal');
        } else if (bmiResult >= 25 && bmiResult <= 29.9) {
          setBMICategory('Overweight');
        } else if (bmiResult >= 30 && bmiResult <= 34.9) {
          setBMICategory('Obesity Class 1');
        } else if (bmiResult >= 35 && bmiResult <= 39.9) {
          setBMICategory('Obesity Class 2');
        } else {
          setBMICategory('Obesity Class 3 (Morbid Obesity)');
        }
      } else {
        alert('Please enter your height and weight.');
      }
    };

    const clearInputs = () => {
        setHeight('');
        setWeight('');
        setBMI(null);
        setBMICategory('');
      };

  return (
    <div className='bg-light min-h-screen w-full'>
        <nav className="w-full text-white flex justify-between text-sm md:text-base lg:text-lg">
          <div className="font-bold text-oran ml-3">CBP</div>
        </nav>

        <div className="max-w-md mx-auto my-8 p-6 bg-red/10 rounded-md shadow-md font-medium">
      <h2 className="text-2xl font-extrabold mb-4">BMI Check</h2>
      <div className="mb-4">
        <label className="block mb-1">Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 border rounded-md bg-light/0 border-oran"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border rounded-md bg-red/0 border-oran"
        />
      </div>
      <button
        onClick={calculateBMI}
        className="bg-oran text-dark py-2 px-4 rounded-md hover:bg-oran/50"
      >
        Calculate BMI
      </button>
      <button
          onClick={clearInputs}
          className="bg-red text-dark ml-4 py-2 px-4 rounded-md hover:bg-red/50"
        >
          Clear
        </button>
      {bmi && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Your BMI Result:</h3>
          <p className="text-xl font-bold">{bmi}</p>
          <p className="mt-2">BMI Category: <span className='font-bold text-oran'>{bmiCategory}</span></p>
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">BMI Categories:</h3>
        <ul className="list-disc list-inside text-sm font-normal">
          <li>Underweight: BMI less than 18.5</li>
          <li>Normal: BMI between 18.5 and 24.9</li>
          <li>Overweight: BMI between 25 and 29.9</li>
          <li>Obesity Class 1: BMI between 30 and 34.9</li>
          <li>Obesity Class 2: BMI between 35 and 39.9</li>
          <li>Obesity Class 3 (Morbid Obesity): BMI 40 or more</li>
        </ul>
      </div>
      <div className="mt-8">
        <Link
          to="/"
          className="text-oran hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
    </div>
    
  );
}

export default BMICalculator;
