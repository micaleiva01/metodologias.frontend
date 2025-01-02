import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditTeam() {
  const navigate = useNavigate();
  const { name } = useParams(); // Get the team's name from the URL

  const [team, setTeam] = useState({
    name: "",
    logoUrl: "",
    twitter: "",
  });

  // Fetch the team data from the backend
  useEffect(() => {
    const loadTeam = async () => {
      try {
        console.log("Fetching team with name:", name); // Debugging log
        const response = await axios.get(`http://localhost:8000/${name}`);
        console.log("Team data fetched:", response.data); // Debugging log
        setTeam(response.data); // Populate the form with the fetched data
      } catch (error) {
        console.error("Error fetching team data:", error);
        alert("Failed to load team data. Please check the console for details.");
      }
    };

    if (name) {
      loadTeam();
    } else {
      console.error("Team name is missing in URL.");
    }
  }, [name]);

  // Handle input changes
  const onInputChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  // Submit the updated data
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated team data:", team); // Debugging log
      await axios.put(`http://localhost:8000/${name}`, team); // Update the team in the backend
      navigate("/teams"); // Redirect to the teams list
    } catch (error) {
      console.error("Error updating team data:", error);
      alert("Failed to update team data. Please check the console for details.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
          <h2 className="text-center m-4">EDITAR EQUIPO</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del equipo"
                name="name"
                value={team.name} // Prepopulate with the team's name
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="logoUrl" className="form-label">
                Logo del equipo:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Logo del equipo"
                name="logoUrl"
                value={team.logoUrl} // Prepopulate with the team's logo URL
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="twitter" className="form-label">
                Twitter:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Insertar twitter del equipo"
                name="twitter"
                value={team.twitter} // Prepopulate with the team's Twitter
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-danger">
              Editar equipo
            </button>
            <Link className="btn btn-outline-secondary ms-2" to="/teams">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTeam;
