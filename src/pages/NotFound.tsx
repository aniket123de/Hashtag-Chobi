import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  // Log the 404 error with the path that triggered the error
  useEffect(() => {
    console.error(`404 Error: User attempted to access non-existent route: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Centered container for the 404 message */}
      <div className="text-center">
        {/* 404 Error heading */}
        <h1 className="text-4xl font-extrabold text-red-500 mb-4">404</h1>

        {/* Message informing the user that the page is not found */}
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>

        {/* Link to return to the home page */}
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
