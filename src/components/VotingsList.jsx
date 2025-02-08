import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function VotingsList() {
    const [votings, setVotings] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/votings")
            .then(res => setVotings(res.data))
            .catch(error => console.error("Error fetching votings:", error));
    }, []);

    const handleVote = (permalink) => {
        if (!name || !email) {
            alert("Please enter your name and email to vote.");
            return;
        }
        window.location.href = `/votings/${permalink}?name=${name}&email=${email}`;
    };

    return (
        <div className="container my-4">
            <div className="mb-4 d-flex gap-2">
                <input type="text" placeholder="Your Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Your Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="row">
                {votings.map((voting) => (
                    <div key={voting.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{voting.title}</h5>
                                <p className="card-text">{voting.description}</p>
                                {new Date(voting.end_date) < new Date() ? (
                                    <Link to={`/votings/${voting.permalink}/results`} className="btn btn-outline-info">
                                        Ver Resultados
                                    </Link>
                                ) : (
                                    <button className="btn btn-outline-success" onClick={() => handleVote(voting.permalink)}>
                                        Ver Detalles y Votar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default VotingsList;
