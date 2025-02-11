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
    loadCars();
  }, []); // ✅ Load all cars at first

  useEffect(() => {
    if (user) {
      applyFiltering(user);
    }
  }, [user]); // ✅ Apply filtering when user data is available

  const loadCars = async () => {
    try {
      const result = await axios.get("http://localhost:8000/cars");
      setCars(result.data); // ✅ Load all cars without filtering first
    } catch (error) {
      alert("Error fetching cars: " + error.message);
    }
  };

  const applyFiltering = (loggedUser) => {
    if (loggedUser?.rol === "TEAM_MANAGER" && loggedUser.teamName?.id) {
      setCars((prevCars) => prevCars.filter(
        (car) => car.teamName?.id === loggedUser.teamName.id
      ));
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
              <CarCard car={car} user={user} /> {/* ✅ Pass user to CarCard */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CarList;
