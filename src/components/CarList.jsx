import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./CarCard";

function CarList() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadCars(user);
    }
  }, [user]);

  const loadCars = async (loggedUser) => {
    try {
      const result = await axios.get("http://localhost:8000/cars");
      let filteredCars = result.data;

      if (loggedUser?.rol === "TEAM_MANAGER" && loggedUser.teamName?.id) {
        filteredCars = result.data.filter(
          (car) => car.teamName.id === loggedUser.teamName.id
        );
      }

      setCars(filteredCars);
    } catch (error) {
      alert("Error fetching cars: " + error.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        {cars.length === 0 ? (
          <p className="text-white text-center">No hay coches disponibles.</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <CarCard car={car} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CarList;
