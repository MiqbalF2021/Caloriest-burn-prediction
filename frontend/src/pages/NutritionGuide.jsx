import React from 'react';
import pizzaImage from '/img/pizza.png';
import burgerImage from '/img/burger.png';
import friesImage from '/img/fries.png';
import cookieImage from '/img/cookie.png';
import iceCreamImage from '/img/ice-cream.png';
import { Link } from 'react-router-dom'

const dailyCalorieNeeds = 2000;

const meals = {
  breakfast: {
    title: 'Breakfast',
    items: [
      { name: 'Oatmeal', calories: 150 },
      { name: 'Banana', calories: 90 },
    ],
    totalCalories: 240,
  },
  lunch: {
    title: 'Lunch',
    items: [
      { name: 'Chicken Salad', calories: 350 },
      { name: 'Apple', calories: 80 },
    ],
    totalCalories: 430,
  },
  dinner: {
    title: 'Dinner',
    items: [
      { name: 'Grilled Salmon', calories: 400 },
      { name: 'Steamed Vegetables', calories: 100 },
    ],
    totalCalories: 500,
  },
};

const snacks = [
  { name: 'Pizza', calories: 300, image: pizzaImage },
  { name: 'Burger', calories: 450, image: burgerImage },
  { name: 'Fries', calories: 300, image: friesImage },
  { name: 'Cookie', calories: 200, image: cookieImage },
  { name: 'Ice Cream', calories: 250, image: iceCreamImage },
];

const Meal = ({ title, items, totalCalories }) => (
  <div className="p-6 border rounded-lg shadow-lg bg-white mb-6 font-medium">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index} className="mb-2 flex justify-between">
          <span>{item.name}</span>
          <span>{item.calories} kcal</span>
        </li>
      ))}
    </ul>
    <div className="mt-4 text-lg font-semibold">Total: <span className='text-oran'>{totalCalories}</span> kcal</div>
  </div>
);

const MealPlan = () => (
  <div>
    {Object.values(meals).map((meal, index) => (
      <Meal key={index} title={meal.title} items={meal.items} totalCalories={meal.totalCalories} />
    ))}
  </div>
);

const SnackList = () => (
  <div className="p-6 border rounded-lg shadow-lg mb-6 font-medium">
    <h2 className="text-2xl font-semibold mb-4">Famous Snacks</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {snacks.map((snack, index) => (
        <li key={index} className="flex items-center mb-4">
          <img src={snack.image} alt={snack.name} className="w-16 h-16 mr-4" />
          <span>{snack.name}: {snack.calories} kcal</span>
        </li>
      ))}
    </ul>
  </div>
);

const NutritionGuide = () => (
    <div className='bg-light min-h-screen w-full'>
        <div className="container mx-auto p-6 ">
    <h1 className="text-4xl font-extrabold text-center mb-8"><span className='text-oran'>Nutrition</span> Guide</h1>
    <p className="text-center mb-8 text-lg bg-oran/50 px-3 py-3 rounded-xl">
      Welcome to the Nutrition Guide! This guide will help you plan your daily meals and snacks, ensuring you get the right amount of calories and nutrients. The average daily calorie needs for an adult is around {dailyCalorieNeeds} kcal. Your exact needs may vary based on factors like age, gender, and activity level.
    </p>
    <MealPlan />
    <SnackList />
    <p className="text-center mt-8 text-lg bg-oran/50 px-3 py-3 rounded-xl">
      Remember, balanced nutrition and portion control are key to maintaining a healthy lifestyle. Choose whole foods, stay hydrated, and enjoy your meals!
    </p>
    <Link to="/">
    <button 
      className="hover:text-green mt-8 bg-green text-light font-bold py-2 px-4 rounded hover:bg-green/30 hover:scale-105 hover:duration-300 block mx-auto"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Back to Home
    </button>
    </Link>
  </div>
    </div>
  
);

export default NutritionGuide;