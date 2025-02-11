import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

function CreateVoting() {
    let navigate = useNavigate();

    const [voting, setVoting] = useState({
        title: "",
        description: "",
        end_date: "",
        permalink: "",
        pilots: []
    });

    const [availablePilots, setAvailablePilots] = useState([]); 
    const { title, description, end_date, permalink, pilots } = voting;

    useEffect(() => {
        const fetchPilots = async () => {
            try {
                const res = await axios.get("http://localhost:8000/pilots");
                setAvailablePilots(res.data);
            } catch (error) {
                console.error("Error fetching pilots:", error);
            }
        };

        fetchPilots();
    }, []);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        let updatedVoting = { ...voting, [name]: value };

        if (name === "title") {
            updatedVoting.permalink = value
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
        }

        setVoting(updatedVoting);
    };

    const handlePilotSelection = (e) => {
        const selectedPilotId = parseInt(e.target.value);

        if (!pilots.some(pilot => pilot.id === selectedPilotId)) {
            if (pilots.length < 5) {
                const selectedPilot = availablePilots.find(pilot => pilot.id === selectedPilotId);
                setVoting({ ...voting, pilots: [...pilots, selectedPilot] });
            } else {
                alert("You can only select up to 5 pilots.");
            }
        }
    };

    const removePilot = (pilotId) => {
        setVoting({ ...voting, pilots: pilots.filter(pilot => pilot.id !== pilotId) });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
    
        if (pilots.length < 5) {
            alert("You must select at least 5 pilots for the voting.");
            return;
        }
    
        const formattedEndDate = moment(voting.end_date, "YYYY-MM-DD").format("DD-MM-YYYY 00:00:00");
    
        const votingData = {
            permalink: voting.permalink,
            title: voting.title,
            description: voting.description,
            end_date: formattedEndDate,
            pilots: pilots.map(pilot => pilot.id)
        };
    
        console.log("Submitting voting:", JSON.stringify(votingData, null, 2));
    
        try {
            await axios.post("http://localhost:8000/voting", votingData);
            navigate("/votings");
        } catch (error) {
            console.error("Error creating voting:", error.response ? error.response.data : error);
            alert("Error: " + (error.response ? JSON.stringify(error.response.data) : "Unknown error"));
        }
    };
           
    

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center">Crear Nueva Votación</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Título</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="permalink" className="form-label">Permalink (Autogenerado)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="permalink"
                                value={permalink}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="end_date" className="form-label">Fecha de cierre</label>
                            <input
                                type="date"
                                className="form-control"
                                name="end_date"
                                value={end_date}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Seleccionar Pilotos (mínimo 5)</label>
                            <select className="form-control" onChange={handlePilotSelection}>
                                <option value="">-- Select a Pilot --</option>
                                {availablePilots.map((pilot) => (
                                    <option key={pilot.id} value={pilot.id}>
                                        {pilot.name} {pilot.surname} - {pilot.team.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <h6>Pilotos Seleccionados:</h6>
                            {pilots.length > 0 ? (
                                <ul className="list-group">
                                    {pilots.map((pilot) => (
                                        <li key={pilot.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {pilot.name} {pilot.surname} ({pilot.team.name})
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => removePilot(pilot.id)}
                                            >
                                                X
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No pilots selected.</p>
                            )}
                        </div>

                        <button type="submit" className="btn btn-outline-danger">Crear</button>
                        <Link to="/votings" className="btn btn-outline-secondary ms-2">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateVoting;
