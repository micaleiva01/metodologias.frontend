import { Link } from "react-router-dom";

function CarCard({ car, onDelete, onClick }) {
  return (
    <div 
      className="card h-100" 
      style={{ cursor: "pointer", transition: "transform 0.2s" }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={car.imageUrl}
        className="card-img-top"
        alt={`${car.name}`}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">
          <Link to={`/car-details/${car.id}`} className="text-decoration-none">
            {car.name}
          </Link>
        </h5>
        <p className="card-text text-muted">Team: {car.teamName.name}</p>
        <div>
          <Link
            className="btn btn-outline-primary mt-2"
            to={`/edit-car/${car.id}`}
          >
            Edit
          </Link>
          <button
            className="btn btn-danger mx-2"
            onClick={() => onDelete(car.id, car.teamName.name)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
