import React, { useState, useEffect } from "react";
import axios from "axios";

function FuelConsumptionTool() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null); 
  const [laps, setLaps] = useState(1);
  const [fuelConsumption, setFuelConsumption] = useState(0);


  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        alert("Failed to load cars. Please check the console for details.");
      }
    };
    fetchCars();
  }, []);
  

  const handleCarChange = (e) => {
    const carId = e.target.value;
    const car = cars.find((c) => c.id === parseInt(carId, 10));

    if (car) {
      setSelectedCar(car); 
      setFuelConsumption(car.consumption);
    }
  };

  const calculateTotalFuel = () => {
    return fuelConsumption * laps; 
  };

  return (
    <div className="container mt-4">
      <h2 className="text-left">CALCULA EL CONSUMO DE COMBUSTIBLE</h2>
      <div className="mb-3">
        <label htmlFor="carSelect" className="form-label">Seleccione un coche:</label>
        <select
          id="carSelect"
          className="form-select"
          onChange={handleCarChange}
          defaultValue=""
        >
          <option value="" disabled>Seleccione coche</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Show selected car name to remove the ESLint warning */}
      {selectedCar && (
        <div className="mb-3">
          <p>
            <strong>Carro seleccionado:</strong> {selectedCar.name}
          </p>
        </div>
      )}
  
      <div className="mb-3">
        <label htmlFor="laps" className="form-label">Numero de vueltas:</label>
        <input
          type="number"
          id="laps"
          className="form-control"
          value={laps}
          min="1"
          onChange={(e) => setLaps(parseInt(e.target.value, 10))}
        />
      </div>
      
      <div className="mb-3">
        <p>Combustible necesario: <strong>{calculateTotalFuel()} litros</strong></p>
      </div>
    </div>
  );  
}

export default FuelConsumptionTool;
