import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Heading from "./components/heading";
import Pilots from "./pages/Pilots";
import Votings from "./pages/Votings";
import Teams from "./pages/Teams";
import CreateTeam from "./components/CreateTeam";
import CreatePilot from "./components/CreatePilot";
import EditPilot from "./components/EditPilot";
import CreateVoting from "./components/CreateVoting";
import News from "./pages/News";
import CreateNews from "./components/CreateNews";
import Login from "./pages/Login";
import Footer from './components/footer';
import EditNews from "./components/EditNews";
import EditTeam from "./components/EditTeam";
import CreateCalendar from "./components/CreateCalendar";
import EditCalendar from "./components/EditCalendar";
import DeleteCalendar from "./components/DeleteCalendar";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Heading />
          <div className="main-content">
            <Routes>
              <Route path="/pilots" element={<Pilots />} />
              <Route path="/create-pilot" element={<CreatePilot />} />
              <Route path="/edit-pilot/:id" element={<EditPilot />} />
              <Route path="/votings" element={<Votings />} />
              <Route path="/create-voting" element={<CreateVoting />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/create-team" element={<CreateTeam />} />
              <Route path="/edit-team/:name" element={<EditTeam />} />             
              <Route path="/news" element={<News />} />
              <Route path="/create-news" element={<CreateNews />} />
              <Route path="/edit-news/:id" element={<EditNews />} />
              <Route path="/create-calendar" element={<CreateCalendar />} />
              <Route path="/edit-calendar/:race" element={<EditCalendar />} />
              <Route path="/delete-calendar/:race" element={<DeleteCalendar />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;