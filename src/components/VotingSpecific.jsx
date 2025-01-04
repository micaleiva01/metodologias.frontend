import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const VotingSpecific = () => {
    const { permalink } = useParams();
    const [voting, setVoting] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchVoting = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/votings/${permalink}`);
                setVoting(response.data);
            } catch (error) {
                console.error("Error fetching voting details:", error);
            }
        };
        fetchVoting();
    }, [permalink]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/fan-voting/vote", {
                name,
                email,
                permalink,
            });
            setMessage("¡Voto registrado exitosamente!");
        } catch (error) {
            setMessage("Error al registrar el voto. Inténtalo de nuevo.");
            console.error("Error submitting vote:", error);
        }
    };

    if (!voting) return <div>Cargando detalles de la votación...</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">{voting.title}</h1>
            <p className="text-center">{voting.description}</p>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
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
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar Voto</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default VotingSpecific;