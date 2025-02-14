import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CarCard from "./CarCard";
import CarDetailsModal from "./CarDetailsModal";

function CarList() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      console.log("Loaded User from LocalStorage:", storedUser);
      setUser(storedUser);
    }
  }, []);

  const loadCars = useCallback(async () => {
    try {
      const result = await axios.get("http://localhost:8000/cars");
      let carList = result.data;

      console.log("Fetched Cars:", carList);

      // ✅ Apply filtering if the user is a TEAM_MANAGER
      if (user?.rol === "TEAM_MANAGER" && user.teamName) {
        console.log("Filtering Cars for Team:", user.teamName.name);
        carList = carList.filter((car) => car.teamName?.name === user.teamName.name);
      }

      console.log("Filtered Cars:", carList);
      setCars(carList);
    } catch (error) {
      alert("Error fetching cars: " + error.message);
    }
  }, [user]); // ✅ Include 'user' as a dependency

  useEffect(() => {
    if (user) {
      loadCars();
    }
  }, [user, loadCars]); // ✅ Now 'loadCars' is safely included as a dependency

  const handleCardClick = (car) => {
    setSelectedCar(car);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
    <div className="container my-4">
      <div className="row">
        {cars.length === 0 ? (
          <p className="text-white text-center">No hay coches disponibles.</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            onClick={() => handleCardClick(car)} >
              <CarCard car={car} user={user} />
            </div>
          ))
        )}
      </div>
      {selectedCar && <CarDetailsModal car={selectedCar} onClose={closeModal} />}
    </div>
  );
}

export default CarList;
