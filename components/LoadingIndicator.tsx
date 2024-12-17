import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-500 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-transparent border-t-yellow-300 rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-white text-xl ml-4 animate-pulse">Chargement...</p>
    </div>
  );
};

export default LoadingIndicator;
