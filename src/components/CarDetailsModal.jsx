import React from "react";
import { Modal, Button } from "react-bootstrap";

function CarDetailsModal({ car, onClose, user }) {
  if (!car) return null;

  const canManageCar = user?.rol === "TEAM_MANAGER" || user?.rol === "ADMIN";

  return (
    <Modal show={!!car} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{car.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src={car.imageUrl || "https://via.placeholder.com/500"}
          alt={car.name}
          className="img-fluid mb-3"
        />
        <ul className="list-group">
          <li className="list-group-item">Equipo: {car.teamName.name}</li>

          {canManageCar ? (
            <>
              <li className="list-group-item">ERS Slow: {car.ersSlow}</li>
              <li className="list-group-item">ERS Mid: {car.ersMid}</li>
              <li className="list-group-item">ERS Fast: {car.ersFast}</li>
              <li className="list-group-item">Consumo: {car.consumption}</li>
              <li className="list-group-item">Capacidad de la Batería: {car.batteryCapacity}</li>
            </>
          ) : (
            <li className="list-group-item text-muted">Detalles técnicos no disponibles.</li>
          )}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CarDetailsModal;
