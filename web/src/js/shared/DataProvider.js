import React, { useEffect, useState } from 'react';
import axios from "axios";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/current_user");
        setCurrentUser(response.data);
      } catch (err) {
        console.error("Error fetching current user:", err);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
      <DataContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </DataContext.Provider>
  );
};
