import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreatePilot() {
  const navigate = useNavigate();

  const [pilot, setPilot] = useState({
    id: "",
    name: "",
    surname: "",
    initials: "",
    imageUrl: "",
    country: "",
    twitter: "",
    team_name: "",
  });

  const [teams, setTeams] = useState([]);

  const { id, name, surname, initials, imageUrl, country, twitter, team_name } = pilot;

  const onInputChange = (e) => {
    setPilot({ ...pilot, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!id || !name || !surname || !initials || !imageUrl || !country || !twitter || !team_name) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    try {
      const payload = {
        id: parseInt(id, 10), // Ensure `id` is sent as a number
        name,
        surname,
        initials,
        imageUrl,
        country,
        twitter,
        team_name,
      };

      await axios.post("http://localhost:8000/pilots", payload, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/pilots");
    } catch (error) {
      console.error("Error creating pilot:", error);

      const errorMessage =
        error.response?.data?.message || "Failed to create pilot. Please try again.";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:8000/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
          <h2 className="text-center m-4">AÑADIR PILOTO</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Número del piloto:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Número del piloto"
                name="id"
                value={id}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del piloto"
                name="name"
                value={name}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Apellidos:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Apellido(s) del piloto"
                name="surname"
                value={surname}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="initials" className="form-label">
                Iniciales:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Iniciales del piloto"
                name="initials"
                value={initials}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">
                Foto del piloto:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="URL de la foto del piloto"
                name="imageUrl"
                value={imageUrl}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                País:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="País del piloto"
                name="country"
                value={country}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="twitter" className="form-label">
                Twitter:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Twitter del piloto"
                name="twitter"
                value={twitter}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="team_name" className="form-label">
                Equipo:
              </label>
              <select
                className="form-control"
                name="team_name"
                value={team_name}
                onChange={onInputChange}
                required
              >
                <option value="">Seleccione un equipo</option>
                {teams.map((team) => (
                  <option key={team.name} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-outline-danger">
              Añadir piloto
            </button>
            <Link className="btn btn-outline-secondary ms-2" to="/pilots">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePilot;
