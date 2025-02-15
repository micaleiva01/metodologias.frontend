import React, { useEffect, useState } from "react";

function TeamDetailsModal({ show, onHide, team }) {
  const [teamPilots, setTeamPilots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (team) {
      const fetchPilots = async () => {
        try {
          const response = await fetch("http://localhost:8000/pilots");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const pilots = await response.json();

          const filteredPilots = pilots.filter(
            (pilot) => pilot.team?.name === team.name
          );
          setTeamPilots(filteredPilots);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchPilots();
    }
  }, [team]);

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="title modal-title">Escudería {team.name}</h5>
              <button
                type="button"
                className="close"
                onClick={onHide}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>


            <div className="modal-body">
              <img
                src={team.logoUrl}
                alt={`${team.name} Banner`}
                className="img-fluid mb-3"
              />
              {loading ? (
                <p className="text-center">Cargando...</p>
              ) : error ? (
                <p className="text-center text-danger">Error: {error}</p>
              ) : (
                <div>
                  <h4 className="text-center mb-3">Pilotos</h4>
                  <div className="row">
                    {teamPilots.length > 0 ? (
                      teamPilots.map((pilot) => (
                        <div
                          key={pilot.id}
                          className="col-12 col-sm-6 col-md-4 mb-3"
                        >
                          <div className="card">
                            <img
                              src={
                                pilot.imageUrl
                                  ? `http://localhost:8000/images/${pilot.imageUrl}`
                                  : "https://via.placeholder.com/200"
                              }
                              alt={`${pilot.name} ${pilot.surname}`}
                              className="card-img-top"
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body text-center">
                              <h5 className="card-title">
                                {pilot.name} {pilot.surname}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No hay pilotos disponibles.</p>
                    )}
                  </div>
                </div>
              )}
            </div>


            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onHide}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default TeamDetailsModal;