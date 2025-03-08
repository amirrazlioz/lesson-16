import React, { createContext, useState } from 'react';
export const AppContext = createContext();

// Create Provider Component
export const AppProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  return (
    <AppContext.Provider value={{ rooms, setRooms }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;