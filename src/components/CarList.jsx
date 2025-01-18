import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./CarCard";

function CarList() {
  const [cars, setCars] = useState([]);

  // Load all cars
  const loadCars = async () => {
    try {
      const result = await axios.get("http://localhost:8000/cars");
      setCars(result.data);
    } catch (error) {
      alert("Error fetching cars: " + error.message);
    }
  };

  // Delete a car
  const deleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/cars/${id}`);
      // Update the state to remove the deleted car
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      alert("Failed to delete the car. Please try again.");
      console.error("Error deleting car:", error);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        {cars.map((car) => (
          <div key={car.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <CarCard car={car} onDelete={deleteCar} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CarList;