import { AdminDashboard } from "./components/AdminDashboard";
import "./App.css";
import LoginPage from "./components/LoginPage";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-black">
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
