import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Heading from "./components/heading";
import Pilots from "./pages/Pilots";
import Votings from "./pages/Votings";
import Teams from "./pages/Teams";
import CreateTeam from "./components/CreateTeam";
import CreatePilot from "./components/CreatePilot";
import CreateVoting from "./components/CreateVoting";
import Login from "./pages/Login";
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <Router>
      <Heading />
      <Routes>
        <Route path="/pilots" element={<Pilots />} />
        <Route path="/create-pilot" element={<CreatePilot />} />
        <Route path="/votings" element={<Votings />} />
        <Route path="/create-voting" element={<CreateVoting />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/login" element={<Login />} />
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;

