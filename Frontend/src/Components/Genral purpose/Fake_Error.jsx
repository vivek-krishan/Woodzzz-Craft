import React from "react";
import { useNavigate } from "react-router-dom";

const Fake_Error = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-gray-100 flex flex-col justify-center items-center px-6 py-12 ">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found
        </h2>

        <button
          onClick={() => navigate("/")}
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition z-50"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Fake_Error;
