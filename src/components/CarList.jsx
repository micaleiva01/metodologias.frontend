import React, { useEffect, useState } from "react";
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
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    if (user) {
      applyFiltering(user);
    }
  }, [user]);

  const loadCars = async () => {
    try {
      const result = await axios.get("http://localhost:8000/cars");
      setCars(result.data);
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
