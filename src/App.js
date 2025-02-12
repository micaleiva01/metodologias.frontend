import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import JoinTeam from "./components/JoinTeam";
import ManageJoinRequests from "./components/ManageJoinRequests";

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
import UserList from "./components/UserList";

import './App.css';

function PilotsWrapper() {
  return <Outlet />;
}

function ProtectedRoute({ element, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && allowedRoles.includes(user.rol) ? element : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", storedUser);
    setUser(storedUser);
  }, []);

  return (
    <Router>
      <div>
        <Heading />
        <div className="main-content">
          <Routes>
            {/* News */}
            <Route path="/news" element={<News />} />
            <Route path="/create-news" element={<ProtectedRoute element={<CreateNews />} allowedRoles={["ADMIN"]} />} />
            <Route path="/edit-news/:permalink" element={<ProtectedRoute element={<EditNews />} allowedRoles={["ADMIN"]} />} />

            {/* Votings */}
            <Route path="/votings" element={<Votings />} />
            <Route path="/create-voting" element={<ProtectedRoute element={<CreateVoting />} allowedRoles={["ADMIN"]} />} />
            <Route path="/edit-voting" element={<ProtectedRoute element={<EditVoting />} allowedRoles={["ADMIN"]} />} />
            <Route path="/votings/:permalink" element={<VotingSpecific />} />
            <Route path="/votings/:permalink/results" element={<VotingResults />} />

            {/* Pilots */}
            <Route path="/pilots/*" element={<PilotsWrapper />}>
              <Route index element={<Pilots />} />
              <Route path="create" element={<ProtectedRoute element={<CreatePilot />} allowedRoles={["TEAM_MANAGER"]} />} />
              <Route path="edit/:id" element={<ProtectedRoute element={<EditPilot />} allowedRoles={["TEAM_MANAGER"]} />} />
            </Route>

            {/* Teams */}
            <Route path="/teams" element={<Teams />} />
            <Route path="/create-team" element={<ProtectedRoute element={<CreateTeam />} allowedRoles={["TEAM_MANAGER"]} />} />
            <Route path="/edit-team/:name" element={<ProtectedRoute element={<EditTeam />} allowedRoles={["TEAM_MANAGER"]} />} />
            <Route path="/team-details/:name" element={<TeamDetails />} />
            <Route path="/join-team" element={<ProtectedRoute element={<JoinTeam />} allowedRoles={["TEAM_MANAGER"]} />} />
            <Route path="/manage-join-requests" element={<ProtectedRoute element={<ManageJoinRequests />} allowedRoles={["TEAM_MANAGER"]} />} />

            {/* Cars */}
            <Route path="/cars" element={<Cars />} />
            <Route path="/create-car" element={<ProtectedRoute element={<CreateCar />} allowedRoles={["TEAM_MANAGER"]} />} />
            <Route path="/edit-car/:id" element={<ProtectedRoute element={<EditCar />} allowedRoles={["TEAM_MANAGER"]} />} />
            <Route path="/car-details/:id" element={<CarDetails />} />

            {/* Races */}
            <Route path="/races" element={<RacesList />} />
            <Route path="/create-race" element={<ProtectedRoute element={<CreateRace />} allowedRoles={["ADMIN"]} />} />
            <Route path="/edit-race/:date/:city/:name" element={<ProtectedRoute element={<EditRace />} allowedRoles={["ADMIN"]} />} />

            {/* Circuits */}
            <Route path="/circuits" element={<CircuitList />} />
            <Route path="/circuits/create" element={<ProtectedRoute element={<CreateCircuits />} allowedRoles={["ADMIN"]} />} />
            <Route path="/circuits/edit/:city/:name" element={<ProtectedRoute element={<EditCircuit />} allowedRoles={["ADMIN"]} />} />

            {/* Login + Users */}
            <Route path="/login" element={user ? <Navigate to={user.rol === "ADMIN" ? "/admin/dashboard" : "/team-manager/dashboard"} /> : <Login />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/users" element={<ProtectedRoute element={<UserList />} allowedRoles={["ADMIN"]} />} />
          
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
