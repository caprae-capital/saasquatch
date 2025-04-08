import React, { useEffect, useState } from 'react';
import axios from "axios";
import { DataContext } from "./DataContext";
import { UNAUTHORIZED_USER } from "./Constants";

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/current_user");
      setCurrentUser(response.data);
    } catch (err) {
      console.error("Error fetching current user:", err);
      setCurrentUser(UNAUTHORIZED_USER);
    }
  };

  const reloadCurrentUser = async () => {
    await fetchCurrentUser();
  };

  return (
      <DataContext.Provider value={{ currentUser, setCurrentUser, reloadCurrentUser }}>
        {children}
      </DataContext.Provider>
  );
};
