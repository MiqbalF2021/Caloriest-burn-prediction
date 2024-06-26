import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import RecordActivity from './pages/RecordActivity';
import ShowProfile from './pages/ShowProfile';
import BMICalculator from './pages/BmiTest';
import NutritionGuide from './pages/NutritionGuide';

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/record",
    element: <RecordActivity />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/show-profile",
    element: <ShowProfile />,
  },
  {
    path: "/bmi", 
    element: <BMICalculator />,
  },
  {
    path: "/guide", 
    element: <NutritionGuide />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
