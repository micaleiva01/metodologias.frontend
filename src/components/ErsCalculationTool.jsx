import React, { useState, useEffect } from "react";
import axios from "axios";


function ErsCalculationTool() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [drivingMode, setDrivingMode] = useState("normal");
  const [energyPerLap, setEnergyPerLap] = useState(0);
  const [lapsNeeded, setLapsNeeded] = useState(0);

  const energyCap = 4; // capacidad maxima de la bateria en MJ
  //const energyRecoveryLimit = 2; // maxima energia recuperada por vuelta

  const modeFactors = {
    saver: 1.05, // ahorrador +5%
    normal: 0.75, // normal -25%
    sport: 0.40, // deportivo -60%
  };

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
    setSelectedCar(car);
    if (car) {
      const baseEnergy = car.ersSlow; // Assuming `ersSlow` as the base recovery for slow curves.
      setEnergyPerLap(baseEnergy * modeFactors[drivingMode]);
      setLapsNeeded(Math.ceil(energyCap / (baseEnergy * modeFactors[drivingMode])));
    }
  };

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setDrivingMode(mode);
    if (selectedCar) {
      const baseEnergy = selectedCar.ersSlow; // Recalculate based on new driving mode.
      setEnergyPerLap(baseEnergy * modeFactors[mode]);
      setLapsNeeded(Math.ceil(energyCap / (baseEnergy * modeFactors[mode])));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-left">CALCULA EL ERS DE TU COCHE</h2>
      <div className="mb-3">
        <label htmlFor="carSelect" className="form-label">Seleccione un coche:</label>
        <select
          id="carSelect"
          className="form-select"
          onChange={handleCarChange}
          defaultValue=""
        >
          <option value="" disabled>Seleccione un coche</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="modeSelect" className="form-label">Modo:</label>
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
      <div className="mb-3">
        <p>Energia recuperada por vuelta: <strong>{energyPerLap.toFixed(2)} kWh</strong></p>
        <p>Vueltas necesarias para cargar la bateria completamente: <strong>{lapsNeeded}</strong></p>
      </div>
    </div>
  );
}

export default ErsCalculationTool;
