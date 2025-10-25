import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import Loginpage from "./pages/Loginpage.js";
import Registerpage from "./pages/Registerpage.js";
import Dashboard from "./pages/Dashboard.js";
import Notfound from "./pages/Notfound.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
