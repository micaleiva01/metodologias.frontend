import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditCar() {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming cars are fetched by ID

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

  const onInputChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loadCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
        alert("Failed to load car data. Please check the console for details.");
      }
    };

    const loadTeams = async () => {
      try {
        const response = await axios.get("http://localhost:8000/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
        alert("Failed to load teams. Please check the console for details.");
      }
    };

    loadCar();
    loadTeams();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/cars/${id}`, car);
      navigate("/cars");
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Failed to update car. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
          <h2 className="text-center m-4">EDIT CAR</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Car Name:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter car name"
                name="name"
                value={car.name}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ersSlow" className="form-label">
                ERS Slow (Float):
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Enter ERS Slow value"
                name="ersSlow"
                value={car.ersSlow}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ersMid" className="form-label">
                ERS Mid (Float):
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Enter ERS Mid value"
                name="ersMid"
                value={car.ersMid}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ersFast" className="form-label">
                ERS Fast (Float):
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Enter ERS Fast value"
                name="ersFast"
                value={car.ersFast}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="consumption" className="form-label">
                Consumption (Integer):
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter consumption"
                name="consumption"
                value={car.consumption}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="batteryCapacity" className="form-label">
                Battery Capacity (Float):
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Enter battery capacity"
                name="batteryCapacity"
                value={car.batteryCapacity}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="teamName" className="form-label">
                Team:
              </label>
              <select
                className="form-select"
                name="teamName"
                value={car.teamName}
                onChange={onInputChange}
                required
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-outline-danger">
              Update Car
            </button>
            <Link className="btn btn-outline-secondary ms-2" to="/cars">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCar;
