import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function VotingDetailsModal({ show, onHide, voting, name, setName, email, setEmail, handleSubmit }) {
    const [selectedPilot, setSelectedPilot] = useState(null);
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const [results, setResults] = useState(null);
    const [winner, setWinner] = useState(null);

    const endDate = moment(voting.endDate, "DD-MM-YYYY HH:mm:ss").toDate();
    const hasEnded = endDate < new Date();

    useEffect(() => {
        if (hasEnded) {
            const fetchResults = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/fan-voting/${voting.permalink}/results`);
                    console.log("Results fetched:", response.data);
                    setResults(response.data);
                    
                    const maxVotes = Math.max(...Object.values(response.data));
                    const winnerPilotId = Object.keys(response.data).find(pilotId => response.data[pilotId] === maxVotes);
                    const winningPilot = voting.pilots.find(pilot => pilot.id.toString() === winnerPilotId);
                    setWinner(winningPilot);
                } catch (error) {
                    console.error("Error fetching results:", error);
                }
            };
            fetchResults();
        }
    }, [voting, hasEnded]);

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
                            {hasEnded ? (
                                <div className="text-center">
                                    <h4 className="text-danger">Esta votación ha finalizado</h4>
                                    {results ? (
                                        <>
                                            {/*<ul className="list-group mt-3">
                                                {Object.entries(results).map(([pilotNumber, voteCount]) => (
                                                    <li key={pilotNumber} className="list-group-item">
                                                        Piloto {pilotNumber}: {voteCount} votos
                                                    </li>
                                                ))}
                                            </ul>*/}
                                            {winner && (
                                                <div className="mt-4 text-center">
                                                    <h4 className="text-success">El ganador de la encuesta es:</h4>
                                                    <div className="card border-success shadow-lg mt-3 mx-auto" style={{ width: "18rem" }}>
                                                        <img src={winner.imageUrl} className="card-img-top" alt={winner.name} />
                                                        <div className="card-body text-center">
                                                            <h5 className="card-title">{winner.name} {winner.surname}</h5>
                                                            <p className="card-text text-muted">{winner.team.name}</p>
                                                            <img src={winner.team.logoUrl} alt={winner.team.name} style={{ height: "40px" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-muted">Cargando resultados...</p>
                                    )}
                                </div>
                            ) : voteSubmitted ? (
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
                                                    style={{ cursor: hasEnded ? "default" : "pointer", transition: "transform 0.2s", opacity: hasEnded ? 0.5 : 1 }}
                                                    onClick={() => !hasEnded && setSelectedPilot(pilot.id)}
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
                                                disabled={hasEnded}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={hasEnded}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100" disabled={!selectedPilot || hasEnded}>
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
