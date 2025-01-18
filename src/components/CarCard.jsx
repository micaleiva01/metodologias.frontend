import { Link } from "react-router-dom";

function CarCard({ car, onDelete }) {
  return (
    <div className="card h-100">
      <img
        src={car.imageUrl}
        className="card-img-top"
        alt={`${car.name}`}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">
          <Link to={`/car-details/${car.name}`} className="text-decoration-none">
            {car.name}
          </Link>
        </h5>
        <p className="card-text text-muted">Manufacturer: {car.manufacturer}</p>
        <div>
          <Link
            className="btn btn-outline-primary mt-2"
            to={`/edit-car/${car.name}`}
          >
            Edit
          </Link>
          <button
            className="btn btn-danger mx-2"
            onClick={() => onDelete(car.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default CarCard;
