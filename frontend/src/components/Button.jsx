import React from 'react';

const Button = ({ onClick, children, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      } ${className}`}>
      {children}
    </button>
  );
};

export default Button;
