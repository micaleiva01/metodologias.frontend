import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditCar() {
  const navigate = useNavigate();
  const { id } = useParams();

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
        if (!response.data) {
          throw new Error("Car not found");
        }
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
      await axios.put(`http://localhost:8000/cars/${id}`, car, {
        params: { teamName: car.teamName },
      });
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
