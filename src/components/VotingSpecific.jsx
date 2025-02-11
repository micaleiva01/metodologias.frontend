import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const VotingSpecific = () => {
    const { permalink } = useParams();
    const [voting, setVoting] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    //const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchVoting = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/voting/permalink?permalink=${permalink}`);
                console.log("Fetched voting data:", response.data);
                setVoting(response.data);
            } catch (error) {
                console.error("Error fetching voting details:", error);
            }
        };
        fetchVoting();
    }, [permalink]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting vote for:", permalink, "Name:", name, "Email:", email);
    };

    if (!voting) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <h3>Cargando detalles de la votación...</h3>
            </div>
        );
    }

    return (
        <div className="container mt-5">

            <div className="text-center mb-5 text-white">
                <h1 className="fw-bold">{voting.title}</h1>
                <p className="fs-4 text-muted">{voting.description}</p>
            </div>

            <div className="row justify-content-center">
                {voting.pilots.map((pilot) => (
                    <div key={pilot.id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card shadow-lg">
                            <img 
                                src={pilot.imageUrl} 
                                className="card-img-top" 
                                alt={pilot.name} 
                                style={{ height: "300px", objectFit: "cover" }} 
                            />
                            <div className="card-body text-center">
                                <h3 className="card-title fw-bold">{pilot.name} {pilot.surname}</h3>
                                <p className="fs-5 text-muted">{pilot.team.name}</p>
                                <img 
                                    src={pilot.team.logoUrl} 
                                    alt={pilot.team.name} 
                                    style={{ height: "40px" }} 
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 text-center text-white">
                <h3>VOTACIÓN</h3>
                <p className="text-muted text-white">Por favor ingresar su nombre y correo electrónico.</p>

                <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
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
                        <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Enviar voto</button>
                </form>

                {/*message && <div className="alert alert-info mt-3">{message}</div>*/}
            </div>
        </div>
    );
};

export default VotingSpecific;
