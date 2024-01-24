import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Repopage from "../pages/Repopage";
import Errorpage from "../pages/Errorpage";
import Userprofile from "../pages/Userprofile";
import "./App.css";

export default function App() {
  return (
    <div className="app data-scroll">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/repos" element={<Repopage />} />
          <Route path="/error" element={<Errorpage />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}
