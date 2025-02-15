import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTeam() {
  const { name } = useParams(); // Get team name from URL
  const navigate = useNavigate();
  const [team, setTeam] = useState({
    name: "",
    logoUrl: "",
    twitter: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/teams/${name}`);
        console.log("Team fetched:", response.data);
  
        setTeam({
          name: response.data.name,
          logoUrl: response.data.logoUrl || "",
          twitter: response.data.twitter || "",
        });
      } catch (error) {
        console.error("Error loading team data:", error);
        setError("Error loading team. Please try again.");
      }
    };
  
    loadTeam();
  }, [name]);
  

  const onInputChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const validateTeam = () => {
    if (!team.logoUrl || !team.twitter) {
      alert("Both logo URL and Twitter handle are required.");
      return false;
    }
    return true;
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!validateTeam()) return;
  
    try {
      const { name, logoUrl, twitter } = team;
      const payload = { logoUrl, twitter }; 
      
      console.log("Sending update request (PUT):", JSON.stringify(payload, null, 2));
  
      // Axios PUT request
      const response = await axios({
        method: "put",
        url: `http://localhost:8000/teams/${name}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      });
  
      console.log("Update successful:", response.data);
      alert("Team updated successfully!");
      navigate("/teams");
    } catch (error) {
      console.error("Error updating team data:", error.response?.data || error.message);
      setError("Failed to update the team. Please check the input and try again.");
    }
  };  
   

  if (error) {
    return <h2 className="text-danger text-center">{error}</h2>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
          <h2 className="title text-center m-4">EDITAR EQUIPO</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre del Equipo:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={team.name}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="logoUrl" className="form-label">Logo URL:</label>
              <input
                type="text"
                className="form-control"
                name="logoUrl"
                value={team.logoUrl}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="twitter" className="form-label">Twitter:</label>
              <input
                type="text"
                className="form-control"
                name="twitter"
                value={team.twitter}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-danger">Guardar Cambios</button>
            <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => navigate(`/teams/${encodeURIComponent(name)}`)}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTeam;
