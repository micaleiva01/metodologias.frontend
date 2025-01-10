import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//heading + footer
import Heading from "./components/heading";
import Footer from './components/footer';
//pilots
import Pilots from "./pages/Pilots";
import CreatePilot from "./components/CreatePilot";
import EditPilot from "./components/EditPilot";
//votings
import Votings from "./pages/Votings";
import CreateVoting from "./components/CreateVoting";
import EditVoting from "./components/EditVoting";
import VotingSpecific from "./components/VotingSpecific";
import VotingResults from "./components/VotingResults";
//teams
import Teams from "./pages/Teams";
import CreateTeam from "./components/CreateTeam";
import EditTeam from "./components/EditTeam";
import TeamDetails from "./components/TeamDetails";
//news
import News from "./pages/News";
import CreateNews from "./components/CreateNews";
import EditNews from "./components/EditNews";
//races
import RacesList from "./components/RacesList";
import CreateRace from "./components/CreateRace";
import EditRace from "./components/EditRace";
//circuits
import CircuitList from "./components/CircuitList";
import CreateCircuits from "./components/CreateCircuit";
import EditCircuit from "./components/Editcircuit";
//login
import Login from "./pages/Login";
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Heading />
          <div className="main-content">
            <Routes>
              {/*noticias*/}            
              <Route path="/news" element={<News />} />
              <Route path="/create-news" element={<CreateNews />} />
              <Route path="/edit-news/:id" element={<EditNews />} />
              {/*votaciones*/}
              <Route path="/votings" element={<Votings />} />
              <Route path="/create-voting" element={<CreateVoting />} />
              <Route path="/edit-voting" element={<EditVoting />} />
              <Route path="/votings/:permalink" element={<VotingSpecific />} />
              <Route path="/votings/:permalink/results" element={<VotingResults />} />
              {/*pilotos*/}
              <Route path="/pilots" element={<Pilots />} />
              <Route path="/create-pilot" element={<CreatePilot />} />
              <Route path="/edit-pilot/:id" element={<EditPilot />} />
              {/*equipos*/}
              <Route path="/teams" element={<Teams />} />
              <Route path="/create-team" element={<CreateTeam />} />
              <Route path="/edit-team/:name" element={<EditTeam />} />
              <Route path="/team-details/:name" element={<TeamDetails />} />
              {/*calendario*/}
              <Route path="/races" element={<RacesList />} />
              <Route path="/create-race" element={<CreateRace />} />
              <Route path="/edit-race/:date/:city/:name" element={<EditRace />} />
              {/*circuito*/}
              <Route path="/circuits" element={<CircuitList />} />
              <Route path="/create-circuit" element={<CreateCircuits />} />
              <Route path="/edit-circuit/:name/:city" element={<EditCircuit />} />
              {/*login*/}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<News />} />
            </Routes>
          </div>
        <Footer />
      </div>
    </Router>
  );
}


export default App;