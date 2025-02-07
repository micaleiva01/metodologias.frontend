import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./CarCard";

function CarList() {
  const [cars, setCars] = useState([]);

  const loadCars = async () => {
    try {
      const result = await axios.get("http://localhost:8000/cars");
      setCars(result.data);
    } catch (error) {
      alert("Error fetching cars: " + error.message);
    }
  };

  const deleteCar = async (id, teamName) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this car?");
    
    if (!isConfirmed) {
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8000/cars/${id}`, { params: { teamName } });

      setCars(cars.filter((car) => car.id !== id));
      alert("Car deleted successfully!");
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
            <CarCard car={car} onDelete={(id) => deleteCar(id, car.teamName.name)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;
