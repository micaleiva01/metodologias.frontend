import React, { useState } from "react";

function VotingDetailsModal({ show, onHide, voting, name, setName, email, setEmail, handleSubmit }) {
    const [selectedPilot, setSelectedPilot] = useState(null);
    const [voteSubmitted, setVoteSubmitted] = useState(false);

    if (!show || !voting) return null;

    const onVoteSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit(e, selectedPilot);
        setVoteSubmitted(true);
    };

    return (
        <>
            <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">{voting.title}</h5>
                            <button type="button" className="close" onClick={onHide} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            {voteSubmitted ? (
                                <div className="text-center">
                                    <h4>Tu voto ha sido enviado!</h4>
                                    <p>Gracias por participar!</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-muted">{voting.description}</p>

                                    <h6 className="mt-3 text-center">Seleccionar piloto para votar</h6>
                                    <div className="row">
                                        {voting.pilots.map((pilot) => (
                                            <div key={pilot.id} className="col-md-6 mb-3">
                                                <div 
                                                    className={`card ${selectedPilot === pilot.id ? "border-primary shadow-lg" : ""}`}
                                                    style={{ cursor: "pointer", transition: "transform 0.2s" }}
                                                    onClick={() => setSelectedPilot(pilot.id)}
                                                >
                                                    <img src={pilot.imageUrl} className="card-img-top" alt={pilot.name} />
                                                    <div className="card-body text-center">
                                                        <h5 className="card-title">{pilot.name} {pilot.surname}</h5>
                                                        <p className="card-text text-muted">{pilot.team.name}</p>
                                                        <img src={pilot.team.logoUrl} alt={pilot.team.name} style={{ height: "40px" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <h5 className="mt-4">Enviar voto</h5>
                                    <form onSubmit={onVoteSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Nombre:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Correo Electronico:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100" disabled={!selectedPilot}>
                                            Enviar Voto
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onHide}>Cerrar</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default VotingDetailsModal;
