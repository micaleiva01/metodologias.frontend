import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditTeam() {
  const navigate = useNavigate();
  const { name } = useParams();

  const [team, setTeam] = useState({
    name: "",
    logoUrl: "",
    twitter: "",
    pilots: [],
  });

  const [availablePilots, setAvailablePilots] = useState([]);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        console.log("Fetching team:", name);
        const response = await axios.get(`http://localhost:8000/teams/${encodeURIComponent(name)}`);
        console.log("Team data fetched:", response.data);
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
        alert("Error loading team data.");
      }
    };

    const loadPilots = async () => {
      try {
        const response = await axios.get("http://localhost:8000/pilots");
        setAvailablePilots(response.data);
      } catch (error) {
        console.error("Error loading pilots:", error);
      }
    };

    if (name) {
      loadTeam();
      loadPilots();
    }
  }, [name]);

  const onInputChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const addPilot = (pilotId) => {
    const selectedPilot = availablePilots.find((pilot) => pilot.id === parseInt(pilotId));
    if (selectedPilot && !team.pilots.some((pilot) => pilot.id === selectedPilot.id)) {
      setTeam((prevTeam) => ({
        ...prevTeam,
        pilots: [...prevTeam.pilots, selectedPilot],
      }));
    }
  };

  const removePilot = (pilotId) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      pilots: prevTeam.pilots.filter((pilot) => pilot.id !== pilotId),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!team || !team.name) {
      console.error("Error: Missing team data.");
      alert("Error: No valid team data provided.");
      return;
    }

    const updatedTeam = {
      name: team.name,
      logoUrl: team.logoUrl,
      twitter: team.twitter,
      pilots: team.pilots.map((p) => ({
        id: p.id,
        name: p.name,
        surname: p.surname,
        initials: p.initials,
        imageUrl: p.imageUrl,
        country: p.country || "UNKNOWN",
        twitter: p.twitter,
        team: { name: team.name },
      })),
    };

    console.log("Submitting updated team data:", JSON.stringify(updatedTeam, null, 2));

    try {
      await axios.put(`http://localhost:8000/teams/${encodeURIComponent(team.name)}`, updatedTeam, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Team updated successfully");
      navigate("/teams");
    } catch (error) {
      console.error("Error updating team data:", error);
      alert("Error updating team. Check the console.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 mb-4 shadow text-white">
          <h2 className="text-center m-4">EDIT TEAM</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" name="name" value={team.name} disabled />
            </div>

            <div className="mb-3">
              <label htmlFor="logoUrl" className="form-label">Team Logo:</label>
              <input type="text" className="form-control" name="logoUrl" value={team.logoUrl} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="twitter" className="form-label">Twitter:</label>
              <input type="text" className="form-control" name="twitter" value={team.twitter} onChange={onInputChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="pilots" className="form-label">Pilots:</label>
              <ul className="list-group mb-3">
                {team.pilots.map((pilot) => (
                  <li key={pilot.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {pilot.name} {pilot.surname}
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removePilot(pilot.id)}>Remove</button>
                  </li>
                ))}
              </ul>

              <select className="form-select" onChange={(e) => addPilot(e.target.value)} defaultValue="">
                <option value="" disabled>Add Pilot</option>
                {availablePilots.filter((pilot) => !team.pilots.some((p) => p.id === pilot.id)).map((pilot) => (
                  <option key={pilot.id} value={pilot.id}>{pilot.name} {pilot.surname}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-outline-danger">Save Changes</button>
            <Link className="btn btn-outline-secondary ms-2" to="/teams">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTeam;
