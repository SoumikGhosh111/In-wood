import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from '../functions/veifyUser';// Ensure this path is correct

const ProtectedRoute = ({ children }) => {
  // Use the useLocation hook at the top level of your component
  const location = useLocation();

  // Define an async function to check the user's authentication status
  const checkUser = async () => {
    const isValid = await getUser();
    console.log(isValid);
    return isValid;
  };

  // Call the async function and handle the result
  const userIsValid = checkUser();

  // Since checkUser is async, you'll need to handle the result appropriately
  // For demonstration, we'll assume the user is valid if the checkUser function resolves
  // without throwing an error. In a real application, you might want to handle loading states.
  if (!userIsValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the children if the user is valid
  return children;
};

export default ProtectedRoute;
