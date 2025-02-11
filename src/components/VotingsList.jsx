import React, { useEffect, useState } from "react";
import axios from "axios";
import VotingDetailsModal from "./VotingDetailsModal";

function VotingsList() {
    const [votings, setVotings] = useState([]);
    const [selectedVoting, setSelectedVoting] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null); // ✅ User state for role check

    useEffect(() => {
        loadVotings();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const loadVotings = async () => {
        try {
            const results = await axios.get("http://localhost:8000/voting");
            setVotings(results.data);
        } catch (error) {
            console.error("Error loading votings:", error);
        }
    };

    const handleVote = (voting) => {
        setSelectedVoting(voting);
        setShowModal(true);
    };

    const handleSubmit = async (e, selectedPilot) => {
        e.preventDefault();
        if (!selectedPilot) {
            alert("Please select a pilot before voting.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/fan-voting/vote", {
                name,
                email,
                permalink: selectedVoting.permalink,
                number: selectedPilot
            });
            alert("Vote submitted successfully!");
            setShowModal(false);
        } catch (error) {
            console.error("Error submitting vote:", error);
            alert("Error submitting vote. Please try again.");
        }
    };

    const handleDeleteVoting = async (permalink) => {
        if (!window.confirm("Are you sure you want to delete this voting?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/voting`, { params: { permalink } });
            alert("Voting deleted successfully.");
            loadVotings(); // ✅ Refresh votings after delete
        } catch (error) {
            console.error("Error deleting voting:", error);
            alert("Error deleting voting. Try again.");
        }
    };

    return (
        <div className="container my-4">
            <div className="row">
                {votings.map((voting) => (
                    <div key={voting.permalink} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{voting.title}</h5>
                                <p className="card-text">{voting.description}</p>
                                <button className="btn btn-outline-success" onClick={() => handleVote(voting)}>
                                    Ver detalles y votar
                                </button>

                                {user && user.rol === "ADMIN" && (
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleDeleteVoting(voting.permalink)}
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedVoting && (
                <VotingDetailsModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    voting={selectedVoting}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
}

export default VotingsList;
