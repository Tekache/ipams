// src/context/AppContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getIPs as apiGetIPs, addIP as apiAddIP, updateIP as apiUpdateIP, deleteIP as apiDeleteIP } from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [ipList, setIpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadIPs = async () => {
    try {
      setLoading(true);
      const res = await apiGetIPs();
      setIpList(res.data || []);
    } catch (err) {
      console.error("Failed to load IPs:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIPs();
  }, []);

  const addIP = async (data) => {
    try {
      const res = await apiAddIP(data);
      // push created item (backend returns full doc)
      setIpList(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Failed to add IP:", err);
      throw err;
    }
  };

  const updateIP = async (id, data) => {
    try {
      const res = await apiUpdateIP(id, data);
      setIpList(prev => prev.map(item => (item._id === id ? res.data : item)));
      return res.data;
    } catch (err) {
      console.error("Failed to update IP:", err);
      throw err;
    }
  };

  const deleteIP = async (id) => {
    try {
      await apiDeleteIP(id);
      setIpList(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Failed to delete IP:", err);
      throw err;
    }
  };

  return (
    <AppContext.Provider value={{ ipList, loading, error, addIP, updateIP, deleteIP, loadIPs }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
