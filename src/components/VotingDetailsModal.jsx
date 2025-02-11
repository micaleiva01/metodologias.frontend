import React, { useState } from "react";

function VotingDetailsModal({ show, onHide, voting, name, setName, email, setEmail, handleSubmit }) {
    const [selectedPilot, setSelectedPilot] = useState(null);
    const [voteSubmitted, setVoteSubmitted] = useState(false);

    if (!show || !voting) return null; // ✅ Prevents modal from showing when `show` is false

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

                        {/* Modal Header */}
                        <div className="modal-header">
                            <h5 className="modal-title">{voting.title}</h5>
                            <button type="button" className="close" onClick={onHide} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            {voteSubmitted ? (
                                <div className="text-center">
                                    <h4>Your vote has been successfully submitted!</h4>
                                    <p>Thank you for participating!</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-muted">{voting.description}</p>

                                    {/* Pilots Selection */}
                                    <h6 className="mt-3 text-center">Select a Pilot to Vote</h6>
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

                                    {/* Voting Form */}
                                    <h5 className="mt-4">Submit Your Vote</h5>
                                    <form onSubmit={onVoteSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Your Name</label>
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
                                            <label htmlFor="email" className="form-label">Your Email</label>
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
                                            Submit Vote
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default VotingDetailsModal;
