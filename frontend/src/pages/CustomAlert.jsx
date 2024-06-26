import React from "react";

const CustomAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-20 backdrop-blur-sm">
      <div className="bg-light p-6 rounded shadow-md max-w-sm w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-extrabold">Message <span className="text-red">.</span></h3>
          <button onClick={onClose} className="text-dark text-xl">&times;</button>
        </div>
        <p className="mt-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red text-light py-2 rounded font-bold hover:bg-red/30 hover:text-red hover:scale-105 hover:duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
