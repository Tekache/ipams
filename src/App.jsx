import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddIP from "./components/AddIP";
import EditIP from "./components/EditIP";
import Charts from "./components/Charts";

function App() {
  return (
    <Router>
      <Navbar />

      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddIP />} />
          <Route path="/edit/:id" element={<EditIP />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
