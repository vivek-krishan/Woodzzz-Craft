import React from "react";

const Button = ({ onClick, className, children, type = "button" }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded-2xl drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl transition duration-150 ease-in-out ${className} bg-[#3C7A5D] hover:bg-[#2A5641] text-white`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
