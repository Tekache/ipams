// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
// <ThemeProvider>
//   <AppProvider>
//     <App />
//   </AppProvider>
// </ThemeProvider>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
