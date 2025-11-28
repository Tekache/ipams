import { createContext, useContext, useEffect, useState } from "react";

// Create Theme Context
const ThemeContext = createContext();

// Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // load saved theme
    return localStorage.getItem("theme") || "light";
  });

  // toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // apply theme to <body>
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook
export const useTheme = () => useContext(ThemeContext);
