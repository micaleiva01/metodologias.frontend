import React from "react";
import { Modal, Button } from "react-bootstrap";

function CarDetailsModal({ car, onClose }) {
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
          <li className="list-group-item">ERS Slow: {car.ersSlow}</li>
          <li className="list-group-item">ERS Mid: {car.ersMid}</li>
          <li className="list-group-item">ERS Fast: {car.ersFast}</li>
          <li className="list-group-item">Consumo: {car.consumption}</li>
          <li className="list-group-item">Capacidad de la Bateria: {car.batteryCapacity}</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CarDetailsModal;
