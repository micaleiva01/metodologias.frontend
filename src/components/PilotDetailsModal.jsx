// PilotDetailsModal.jsx
import React from "react";

function PilotDetailsModal({ show, onHide, pilot }) {
  if (!show) return null;

  return (
    <>
      {/* Modal */}
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
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">{pilot.name} {pilot.surname}</h5>
              <button
                type="button"
                className="close"
                onClick={onHide}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <img
                src={pilot.imageUrl}
                alt={`${pilot.name} ${pilot.surname}`}
                className="img-fluid mb-3"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
              <div className="container">
                <p><strong>Dorsal:</strong> {pilot.id}</p>
                <p><strong>Iniciales:</strong> {pilot.initials}</p>
                <p><strong>Equipo:</strong> {pilot.team.name}</p>
                <p><strong>País:</strong> {pilot.country}</p>
                <p><strong>Twitter:</strong> {pilot.twitter}</p>
              </div>
            </div>

            {/* Modal Footer */}
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
      {/* Modal Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default PilotDetailsModal;
