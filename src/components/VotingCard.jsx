import React from "react";
import { Link } from "react-router-dom";

function VotingCard({ voting, user, onVote, onDelete }) {
    const isAdmin = user && user.rol === "ADMIN";

    return (
        <div className="card h-100">
            <div className="card-body text-center">
                <h5 className="card-title">{voting.title}</h5>
                <p className="card-text text-muted">{voting.description}</p>
                <button 
                    className="btn btn-outline-success w-100 mb-1"
                    onClick={() => onVote(voting)}
                >
                    Ver Detalles y Votar
                </button>

                {/* solo admins */}
                {isAdmin && (
                    <div className="m-2">
                        <Link 
                            className="btn btn-outline-primary mt-2"
                            to={`/edit-voting/${voting.permalink}`}
                            onClick={() => console.log("Editing voting with permalink:", voting.permalink)}
                        >
                            Editar
                        </Link>
                        <button 
                            className="btn btn-danger mx-2 mt-1"
                            onClick={() => onDelete(voting.permalink)}
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VotingCard;
