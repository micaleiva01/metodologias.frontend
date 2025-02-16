import React, { useState, useEffect } from "react";
import axios from "axios";

function FuelConsumptionTool() {
  const [cars, setCars] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [user, setUser] = useState(null);

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
        
        // ✅ Filter cars based on the logged-in user’s team
        if (user?.rol === "TEAM_MANAGER" && user.teamName) {
          filteredCars = filteredCars.filter(car => car.teamName?.name === user.teamName.name);
        }

        setCars(filteredCars);
        setCircuits(circuitResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please check the console for details.");
      }
    };
    
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleCarChange = (e) => {
    const carId = parseInt(e.target.value, 10);
    const car = cars.find((c) => c.id === carId);
    if (car) {
      setSelectedCar(car);
    }
  };

  const handleCircuitChange = (e) => {
    const circuitName = e.target.value;
    const circuit = circuits.find((c) => c.name === circuitName);
    if (circuit) {
      setSelectedCircuit(circuit);
    }
  };

  const calculateFuelPerLap = () => {
    if (!selectedCar || !selectedCircuit) return 0;

    const { length } = selectedCircuit;
    const { consumption } = selectedCar;

    const consumptionPerLap = (consumption / 100000) * length

    return (consumptionPerLap).toFixed(2);
  };

  const calculateTotalFuel = () => {
    if (!selectedCar || !selectedCircuit) return 0;
    return (calculateFuelPerLap() * selectedCircuit.nLaps).toFixed(2);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-left">CALCULA EL CONSUMO DE COMBUSTIBLE</h2>

      <div className="mb-3">
        <label htmlFor="carSelect" className="form-label">Seleccione un coche:</label>
        <select id="carSelect" className="form-select" onChange={handleCarChange} defaultValue="">
          <option value="" disabled>Seleccione coche</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCar && (
        <div className="mb-3">
          <p>
            <strong>Carro seleccionado:</strong> {selectedCar.name}
          </p>
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="circuitSelect" className="form-label">Seleccione un circuito:</label>
        <select id="circuitSelect" className="form-select" onChange={handleCircuitChange} defaultValue="">
          <option value="" disabled>Seleccione circuito</option>
          {circuits.map((circuit) => (
            <option key={circuit.name} value={circuit.name}>
              {circuit.name} ({circuit.city})
            </option>
          ))}
        </select>
      </div>

      {selectedCircuit && (
        <div className="mb-3">
          <p>
            <strong>Circuito seleccionado:</strong> {selectedCircuit.name}
          </p>
        </div>
      )}

      <div className="mb-3">
        <p>Consumo por vuelta: <strong>{calculateFuelPerLap()} litros</strong></p>
      </div>

      <div className="mb-3">
        <p>Combustible total necesario: <strong>{calculateTotalFuel()} litros</strong></p>
      </div>
    </div>
  );
}

export default FuelConsumptionTool;
