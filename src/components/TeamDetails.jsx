import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function TeamDetails() {
  const { name } = useParams(); // Get team name from the URL
  const [teamPilots, setTeamPilots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPilots = async () => {
      try {
        const response = await fetch("http://localhost:8000/pilots");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pilots = await response.json();

        // Filter pilots by the team name
        const filteredPilots = pilots.filter((pilot) => pilot.team?.name === name);
        setTeamPilots(filteredPilots);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPilots();
  }, [name]);

  if (loading) {
    return <p className="text-center text-light">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 p-5">
      {/* Banner Section */}
      <div className="text-center mb-5">
        <img
          src={`https://via.placeholder.com/1200x400`} // Placeholder banner
          alt={`${name} Banner`}
          className="img-fluid mb-4"
        />
        <h1 className="display-4 text-uppercase text-danger">Escudería {name}</h1>
      </div>

      {/* Pilots Section */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-uppercase">Pilotos</h2>
          <div>
            <Link to="/edit-pilots" className="text-decoration-none text-light me-3">
              Editar pilotos
            </Link>
            <Link to="/add-pilot" className="text-decoration-none text-light">
              Añadir piloto
            </Link>
          </div>
        </div>

        <div className="row">
          {teamPilots.length > 0 ? (
            teamPilots.map((pilot) => (
              <div key={pilot.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card bg-secondary text-light">
                  <img
                    src={pilot.imageUrl ? `http://localhost:8000/images/${pilot.imageUrl}` : "https://via.placeholder.com/200"}
                    alt={`${pilot.name} ${pilot.surname}`}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title mb-0">{pilot.name} {pilot.surname}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No hay pilotos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;