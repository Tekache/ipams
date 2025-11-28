import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="btn btn-outline-primary d-flex align-items-center gap-2"
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
