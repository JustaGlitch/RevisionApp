// MockAuthContext.js
import React, { createContext, useContext } from 'react';

// Create a mock context
export const MockAuthContext = createContext();

export const useAuth = () => {
  // You can provide mock implementations for the functions you need here
  // For example, provide mock implementations for login and logout
  return useContext(MockAuthContext);
};

// Mock AuthProvider to wrap your components
export const MockAuthProvider = ({ children }) => {
  // Provide mock values for authToken, login, and logout
  const authContextValue = {
    authToken: 'mockAuthToken', // You can set this to the desired value for testing
    login: () => {},
    logout: () => {},
  };

  return (
    <MockAuthContext.Provider value={authContextValue}>
      {children}
    </MockAuthContext.Provider>
  );
};
