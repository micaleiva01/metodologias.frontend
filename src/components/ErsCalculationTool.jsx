import React, { useState, useEffect } from "react";
import axios from "axios";

function ErsCalculationTool() {
  const [cars, setCars] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [drivingMode, setDrivingMode] = useState("normal");
  const [energyPerLap, setEnergyPerLap] = useState(0);
  const [lapsNeeded, setLapsNeeded] = useState(0);

  const maxEnergyPerLap = 0.6; // Max ERS recovery per lap (kWh)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await axios.get("http://localhost:8000/cars");
        setCars(carResponse.data);

        const circuitResponse = await axios.get("http://localhost:8000/circuits");
        setCircuits(circuitResponse.data);
      } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar coches y circuitos.");
      }
    };
    fetchData();
  }, []);



  useEffect(() => {
    if (!selectedCar || !selectedCircuit) return;
  
    console.log("🚀 useEffect triggered! Current Mode:", drivingMode); 
  
    const modeFactors = {
      saver: 1.05,  // +5% more ERS recovery
      normal: 1,    // No change (100%)
      sport: 0.40,  // -60% ERS recovery
    };
  
    const factor = modeFactors[drivingMode] || 1;
  
    const { ersSlow, ersMid, ersFast, batteryCapacity } = selectedCar;
    const { slowCorners, midCorners, fastCorners } = selectedCircuit;
  
    if (slowCorners + midCorners + fastCorners === 0) return;
  
    // Convert battery capacity from MJ to kWh
    const batteryCapacityKWh = batteryCapacity / 3.6;
  
    // Calculate scaled energy recovery per lap
    let rawRecoveredEnergy =
      (slowCorners * (ersSlow / 100) * 0.01) +
      (midCorners * (ersMid / 100) * 0.01) +
      (fastCorners * (ersFast / 100) * 0.01);
  
    console.log("🔍 Raw Recovered Energy (before factor):", rawRecoveredEnergy);
  
    // Apply mode factor before capping the energy recovery
    let adjustedRecoveredEnergy = rawRecoveredEnergy * factor;
  
    console.log("⚡ Adjusted Energy (before cap):", adjustedRecoveredEnergy);
  
    // Cap recovery per lap at max regulation (0.6 kWh)
    adjustedRecoveredEnergy = Math.min(adjustedRecoveredEnergy, maxEnergyPerLap);
  
    console.log("⚡ Final Adjusted Recovered Energy (after cap):", adjustedRecoveredEnergy);
  
    // Calculate how many laps are needed to fully charge the battery
    const requiredLaps = adjustedRecoveredEnergy > 0 ? Math.ceil(batteryCapacityKWh / adjustedRecoveredEnergy) : 0;
  
    console.log("🏎️ Laps Needed:", requiredLaps);
  
    setEnergyPerLap(adjustedRecoveredEnergy);
    setLapsNeeded(requiredLaps);
  }, [selectedCar, selectedCircuit, drivingMode]);
  

  

  const handleCarChange = (e) => {
    const carId = parseInt(e.target.value, 10);
    const car = cars.find((c) => c.id === carId);
    if (car) setSelectedCar(car);
  };

  const handleCircuitChange = (e) => {
    const circuitName = e.target.value;
    const circuit = circuits.find((c) => c.name === circuitName);
    if (circuit) setSelectedCircuit(circuit);
  };

  const handleModeChange = (e) => {
    console.log("Mode changed to:", e.target.value); // Debugging log
    setDrivingMode(e.target.value);
};


  return (
    <div className="container mt-4">
      <h2 className="text-left">CÁLCULO DEL ERS</h2>

      {/* Car Selection */}
      <div className="mb-3">
        <label htmlFor="carSelect" className="form-label">Seleccione un coche:</label>
        <select id="carSelect" className="form-select" onChange={handleCarChange} defaultValue="">
          <option value="" disabled>Seleccione un coche</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>

      {/* Circuit Selection */}
      <div className="mb-3">
        <label htmlFor="circuitSelect" className="form-label">Seleccione un circuito:</label>
        <select id="circuitSelect" className="form-select" onChange={handleCircuitChange} defaultValue="">
          <option value="" disabled>Seleccione un circuito</option>
          {circuits.map((circuit) => (
            <option key={circuit.name} value={circuit.name}>
              {circuit.name} ({circuit.city})
            </option>
          ))}
        </select>
      </div>

      {/* Driving Mode Selection */}
      <div className="mb-3">
        <label htmlFor="modeSelect" className="form-label">Modo de conducción:</label>
        <select id="modeSelect" className="form-select" value={drivingMode} onChange={handleModeChange}>
          <option value="normal">Normal</option>
          <option value="saver">Ahorro</option>
          <option value="sport">Sport</option>
        </select>
      </div>

      {/* ERS Calculation Results */}
      {selectedCar && selectedCircuit && (
        <div className="mb-3">
          <p>Capacidad de la batería: <strong>{(selectedCar.batteryCapacity / 3.6).toFixed(2)} kWh</strong></p>
          <p>Energia recuperada por vuelta: <strong>{energyPerLap.toFixed(2)} kWh</strong></p>
          <p>Vueltas necesarias para cargar la batería completamente: <strong>{lapsNeeded}</strong></p>
        </div>
      )}
    </div>
  );
}

export default ErsCalculationTool;
