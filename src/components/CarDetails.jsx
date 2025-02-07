import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CarDetails() {
  
  const { name } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/cars/${name}`);
        if (!response.ok) {
          throw new Error(`error HTTP! status: ${response.status}`);
        }
        const car = await response.json();
        setCarDetails(car);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [name]);

  if (loading) {
    return <p className="text-center text-light">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 p-5">
      <div className="text-center mb-5">
        <img
          src={carDetails.imageUrl || "https://via.placeholder.com/1200x400"}
          alt={`${carDetails.name} Banner`}
          className="img-fluid mb-4"
        />
        <h1 className="display-4 text-uppercase text-danger">{carDetails.name}</h1>
      </div>

      <div className="mb-5">
        <h2 className="text-uppercase">Details</h2>
        <ul>
          <li>Manufacturer: {carDetails.manufacturer}</li>
          <li>Year: {carDetails.year}</li>
          <li>Engine: {carDetails.engine}</li>
          <li>Top Speed: {carDetails.topSpeed} km/h</li>
        </ul>
        <Link to="/edit-car" className="btn btn-primary mt-4">
          Edit Car
        </Link>
      </div>
    </div>
  );
}

export default CarDetails;
