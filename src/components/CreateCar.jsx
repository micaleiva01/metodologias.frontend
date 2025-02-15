import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateCar() {
  const navigate = useNavigate();

  const [car, setCar] = useState({
    name: "",
    ersSlow: "",
    ersMid: "",
    ersFast: "",
    consumption: "",
    teamName: "",
    batteryCapacity: "",
  });

  const [teams, setTeams] = useState([]);

  const { name, ersSlow, ersMid, ersFast, consumption, teamName, batteryCapacity } = car;

  const onInputChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const loadTeams = async () => {
    try {
      const response = await axios.get("http://localhost:8000/teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar equipos.");
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8000/cars?teamName=${encodeURIComponent(teamName)}`,
        car,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/cars");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message || "Error al crear coche.";
      alert(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
          <h2 className="title text-center m-4">CREAR COCHE</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ersSlow" className="form-label">
                ERS Bajo:
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="ersSlow"
                value={ersSlow}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ersMid" className="form-label">
                ERS Medio:
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="ersMid"
                value={ersMid}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ersFast" className="form-label">
                ERS Rapido:
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="ersFast"
                value={ersFast}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="consumption" className="form-label">
                Consumo de Gasolina:
              </label>
              <input
                type="number"
                className="form-control"
                name="consumption"
                value={consumption}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="batteryCapacity" className="form-label">
                Capacidad de la Bateria:
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="batteryCapacity"
                value={batteryCapacity}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="teamName" className="form-label">
                Equipo:
              </label>
              <select
                className="form-select"
                name="teamName"
                value={teamName}
                onChange={onInputChange}
                required
              >
                <option value="">Seleccione Equipo:</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-outline-danger">
              Crear Coche
            </button>
            <Link className="btn btn-outline-secondary ms-2" to="/cars">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCar;
