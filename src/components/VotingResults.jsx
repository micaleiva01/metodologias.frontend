import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VotingResults = () => {
    const { permalink } = useParams();
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/votings/${permalink}/results`);
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };
        fetchResults();
    }, [permalink]);

    if (!results) return <div>Loading results...</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">Resultados de: {results.votingTitle}</h1>
            <ul className="list-group mt-4">
                {Object.entries(results.votesPerPilot).map(([pilotNumber, voteCount]) => (
                    <li key={pilotNumber} className="list-group-item">
                        Pilot {pilotNumber}: {voteCount} votos
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VotingResults;
