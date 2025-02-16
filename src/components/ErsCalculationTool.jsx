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
  const [user, setUser] = useState(null);

  const maxEnergyPerLap = 0.6;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await axios.get("http://localhost:8000/cars");
        const circuitResponse = await axios.get("http://localhost:8000/circuits");

        let filteredCars = carResponse.data;

        if (user?.rol === "TEAM_MANAGER" && user.teamName) {
          filteredCars = filteredCars.filter(car => car.teamName?.name === user.teamName.name);
        }

        setCars(filteredCars);
        setCircuits(circuitResponse.data);
      } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar coches y circuitos.");
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (!selectedCar || !selectedCircuit) return;

    const factoresModo = {
      saver: 1.05,
      normal: 1,
      sport: 0.40,
    };

    const factor = factoresModo[drivingMode] || 1;

    const { ersSlow, ersMid, ersFast, batteryCapacity } = selectedCar;
    const { slowCorners, midCorners, fastCorners } = selectedCircuit;

    if (slowCorners + midCorners + fastCorners === 0) return;

    const capacidadBateriaKWh = batteryCapacity / 3.6;

    let energiaRecuperada =
      (slowCorners * ersSlow) +
      (midCorners * ersMid) +
      (fastCorners * ersFast);

    let energiaAjustada = energiaRecuperada * factor;

    energiaAjustada = Math.min(energiaAjustada, maxEnergyPerLap);

    const vueltasRequeridas = energiaAjustada > 0 ? Math.ceil(capacidadBateriaKWh / energiaAjustada) : 0;

    setEnergyPerLap(energiaAjustada);
    setLapsNeeded(vueltasRequeridas);
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
    setDrivingMode(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-left">CÁLCULO DEL ERS</h2>

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

      <div className="mb-3">
        <label htmlFor="modeSelect" className="form-label">Modo de conducción:</label>
        <select id="modeSelect" className="form-select" value={drivingMode} onChange={handleModeChange}>
          <option value="normal">Normal</option>
          <option value="saver">Ahorro</option>
          <option value="sport">Sport</option>
        </select>
      </div>

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