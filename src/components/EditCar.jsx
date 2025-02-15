import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditCar() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [car, setCar] = useState({
    name: "",
    imageUrl: "",
    ersSlow: "",
    ersMid: "",
    ersFast: "",
    consumption: "",
    batteryCapacity: "",
    teamName: "",
  });

  useEffect(() => {
    const loadCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cars/${id}`);
        if (!response.data) {
          throw new Error("Car not found.");
        }

        const fetchedCar = response.data;
        setCar({
          ...fetchedCar,
          teamName: fetchedCar.teamName.name,
        });
      } catch (error) {
        console.error("Error fetching car data:", error);
        alert("Failed to load car data.");
      }
    };

    loadCar();
  }, [id]);

  const onInputChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("📤 Sending data:", {
        ...car,
        teamName: car.teamName,
      });

      await axios.put(`http://localhost:8000/cars/${id}`, car, {
        params: { teamName: car.teamName },
      });

      navigate("/cars");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error al actualizar coche.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
          <h2 className="title text-center m-4">EDITAR COCHE</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={car.name}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">Imagen:</label>
              <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={car.imageUrl}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Equipo:</label>
              <input
                type="text"
                className="form-control"
                value={car.teamName}
                disabled //para que no se pueda cambiar el coche de equipo
              />
            </div>

            <button type="submit" className="btn btn-outline-danger">
              Guardar Cambios
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

export default EditCar;
