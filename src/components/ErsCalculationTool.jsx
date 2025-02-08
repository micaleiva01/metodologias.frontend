import React, { useState, useEffect } from "react";
import axios from "axios";

function ErsCalculationTool() {
  const [cars, setCars] = useState([]); 
  const [selectedCar, setSelectedCar] = useState(null); 
  const [drivingMode, setDrivingMode] = useState("normal"); 
  const [energyPerLap, setEnergyPerLap] = useState(0); 
  const [lapsNeeded, setLapsNeeded] = useState(0); 
  const energyCap = 4; // Max ERS capacity

  const modeFactors = {
    saver: 1.05, // 5% more recovery
    normal: 0.75, // 25% less recovery
    sport: 0.40, // 60% less recovery
  };

  // Fetch the list of cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        alert("Failed to load cars. Please check the console.");
      }
    };
    fetchCars();
  }, []);

  // Handle car selection
  const handleCarChange = (e) => {
    const carId = parseInt(e.target.value, 10);
    const car = cars.find((c) => c.id === carId);
    if (!car) return;

    setSelectedCar(car);
    calculateErs(car, drivingMode);
  };

  // Handle driving mode selection
  const handleModeChange = (e) => {
    const mode = e.target.value;
    setDrivingMode(mode);
    if (selectedCar) {
      calculateErs(selectedCar, mode);
    }
  };

  // Calculate ERS energy per lap & laps needed
  const calculateErs = (car, mode) => {
    const baseEnergy = car.ersSlow || 0; // Default to 0 if no ERS data
    const factor = modeFactors[mode] || 1;
    const calculatedEnergyPerLap = baseEnergy * factor;
    const calculatedLapsNeeded = calculatedEnergyPerLap > 0 ? Math.ceil(energyCap / calculatedEnergyPerLap) : 0;

    setEnergyPerLap(calculatedEnergyPerLap);
    setLapsNeeded(calculatedLapsNeeded);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-left">CALCULA EL ERS DE TU COCHE</h2>

      {/* Car Selection */}
      <div className="mb-3">
        <label htmlFor="carSelect" className="form-label">Seleccione un coche:</label>
        <select
          id="carSelect"
          className="form-select"
          onChange={handleCarChange}
          defaultValue=""
        >
          <option value="" disabled>Seleccione un coche</option>
          {cars.length > 0 ? (
            cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))
          ) : (
            <option disabled>Cargando coches...</option>
          )}
        </select>
      </div>

      {/* Driving Mode Selection */}
      <div className="mb-3">
        <label htmlFor="modeSelect" className="form-label">Modo de conducción:</label>
        <select
          id="modeSelect"
          className="form-select"
          value={drivingMode}
          onChange={handleModeChange}
        >
          <option value="normal">Normal</option>
          <option value="saver">Ahorro</option>
          <option value="sport">Sport</option>
        </select>
      </div>

      {/* ERS Calculation Results */}
      {selectedCar && (
        <div className="mb-3">
          <p>Energia recuperada por vuelta: <strong>{energyPerLap.toFixed(2)} kWh</strong></p>
          <p>Vueltas necesarias para cargar la batería completamente: <strong>{lapsNeeded}</strong></p>
        </div>
      )}
    </div>
  );
}

export default ErsCalculationTool;