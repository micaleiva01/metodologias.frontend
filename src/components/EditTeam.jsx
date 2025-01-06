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
  });


  useEffect(() => {
    const loadTeam = async () => {
      try {
        console.log("Buscando el equipo:", name); 
        const response = await axios.get(`http://localhost:8000/teams/${name}`);
        console.log("Datos del equipo encontrados:", response.data);
        setTeam(response.data);
      } catch (error) {
        console.error("Error al buscar datos del equipo:", error);
        alert("Error al cargar datos. Revisar consola");
      }
    };

    if (name) {
      loadTeam();
    } else {
      console.error("Falta de URL");
    }
  }, [name]);


  const onInputChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated team data:", team);
      await axios.put(`http://localhost:8000/teams/${name}`, team);
      navigate("/teams");
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
                value={team.name}
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
                value={team.logoUrl}
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
                value={team.twitter}
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
