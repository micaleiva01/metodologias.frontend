import React from "react";
import axios from "axios";

const handleDelete = async (permalink) => {

    try {
        await axios.delete(`http://localhost:8000/voting`, { params: { permalink } });
        alert("Voting deleted successfully.");
        window.location.reload();
    } catch (error) {
        console.error("Error deleting voting:", error);
        alert("Failed to delete voting. Please try again.");
    }
};

function VotingCard({ voting, user }) {
    const isAdmin = user && user.rol === "ADMIN"; //si es admin o no

    return (
        <div className="card h-100">
            <div className="card-body text-center">
                <h5 className="card-title">{voting.title}</h5>
                <p className="card-text text-muted">{voting.description}</p>
                <button 
                    className="btn btn-outline-success w-100 mb-1"
                    onClick={() => window.location.href = `/votings/${voting.permalink}`}
                >
                    View Details & Vote
                </button>

                {/* solo admins */}
                {isAdmin && (
                    <div className="m-2">
                        <button 
                            className="btn btn-danger mx-2 mt-1"
                            onClick={() => handleDelete(voting.permalink)}
                        >
                            Delete Voting
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VotingCard;
