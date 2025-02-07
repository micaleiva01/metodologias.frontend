import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Heading + Footer
import Heading from "./components/heading";
import Footer from './components/footer';

// Pilots
import Pilots from "./pages/Pilots";
import CreatePilot from "./components/CreatePilot";
import EditPilot from "./components/EditPilot";

// Votings
import Votings from "./pages/Votings";
import CreateVoting from "./components/CreateVoting";
import EditVoting from "./components/EditVoting";
import VotingSpecific from "./components/VotingSpecific";
import VotingResults from "./components/VotingResults";

// Teams
import Teams from "./pages/Teams";
import CreateTeam from "./components/CreateTeam";
import EditTeam from "./components/EditTeam";
import TeamDetails from "./components/TeamDetails";

// Cars
import Cars from "./pages/Cars";
import CreateCar from "./components/CreateCar";
import CarDetails from "./components/CarDetails";
import EditCar from "./components/EditCar";

// News
import News from "./pages/News";
import CreateNews from "./components/CreateNews";
import EditNews from "./components/EditNews";

// Races
import RacesList from "./components/RacesList";
import CreateRace from "./components/CreateRace";
import EditRace from "./components/EditRace";

// Circuits
import CircuitList from "./components/CircuitList";
import CreateCircuits from "./components/CreateCircuit";
import EditCircuit from "./components/EditCircuit";

// Login + Users
import Login from "./pages/Login";
import CreateUser from "./components/CreateUser";

import './App.css';

// --- Create a wrapper for pilot-related routes ---
function PilotsWrapper() {
  return <Outlet />;
}

function App() {
  return (
    <Router>
      <div>
        <Heading />
        <div className="main-content">
          <Routes>
            {/* News */}
            <Route path="/news" element={<News />} />
            <Route path="/create-news" element={<CreateNews />} />
            <Route path="/edit-news/:permalink" element={<EditNews />} />

            {/* Votings */}
            <Route path="/votings" element={<Votings />} />
            <Route path="/create-voting" element={<CreateVoting />} />
            <Route path="/edit-voting" element={<EditVoting />} />
            <Route path="/votings/:permalink" element={<VotingSpecific />} />
            <Route path="/votings/:permalink/results" element={<VotingResults />} />

            {/* Pilots */}
            <Route path="/pilots/*" element={<PilotsWrapper />}>
              <Route index element={<Pilots />} />
              <Route path="create" element={<CreatePilot />} />
              <Route path="edit/:id" element={<EditPilot />} />
            </Route>

            {/* Teams */}
            <Route path="/teams" element={<Teams />} />
            <Route path="/create-team" element={<CreateTeam />} />
            <Route path="/edit-team/:name" element={<EditTeam />} />
            <Route path="/team-details/:name" element={<TeamDetails />} />

            {/* Cars */}
            <Route path="/cars" element={<Cars />} />
            <Route path="/create-car" element={<CreateCar />} />
            <Route path="/edit-car/:id" element={<EditCar />} />
            <Route path="/car-details/:id" element={<CarDetails />} />

            {/* Races */}
            <Route path="/races" element={<RacesList />} />
            <Route path="/create-race" element={<CreateRace />} />
            <Route path="/edit-race/:date/:city/:name" element={<EditRace />} />

            {/* Circuits */}
            <Route path="/circuits" element={<CircuitList />} />
            <Route path="/create-circuit" element={<CreateCircuits />} />
            <Route path="/edit-circuit/:name/:city" element={<EditCircuit />} />

            {/* Login & Users */}
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />

            {/* Home */}
            <Route path="/" element={<News />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
