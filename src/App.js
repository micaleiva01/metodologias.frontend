import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Heading from "./components/heading";
import Pilots from "./pages/Pilots";
import Votings from "./pages/Votings";
import Teams from "./pages/Teams.jsx";
import Footer from './components/footer.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Heading />
      <Routes>
        <Route path="/pilots" element={<Pilots />} />
        <Route path="/votings" element={<Votings />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;

