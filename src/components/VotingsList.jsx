import React, { useEffect, useState } from "react";
import axios from "axios";
import VotingDetailsModal from "./VotingDetailsModal";
import VotingCard from "./VotingCard"; // ✅ Import VotingCard

function VotingsList() {
    const [votings, setVotings] = useState([]);
    const [selectedVoting, setSelectedVoting] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);

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
            console.error("Error cargando votaciones:", error);
        }
    };

    const handleVote = (voting) => {
        setSelectedVoting(voting);
        setShowModal(true);
    };

    const handleSubmit = async (e, selectedPilot) => {
        e.preventDefault();
        if (!selectedPilot) {
            alert("Por favor seleccionar piloto.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/fan-voting/vote", {
                name,
                email,
                permalink: selectedVoting.permalink,
                number: selectedPilot
            });
            alert("Voto realizado con éxito!");
            setShowModal(false);
        } catch (error) {
            console.error("Error al enviar voto:", error);
            alert("Error al enviar voto. Por favor inténtelo nuevamente");
        }
    };

    const handleDeleteVoting = async (permalink) => {
        if (!window.confirm("Estás seguro que deseas eliminar esta votación?")) {
            return;
        }
    
        try {
            await axios.delete(`http://localhost:8000/voting/${permalink}`, {
                withCredentials: true, 
            });
    
            alert("Votación eliminada con éxito!");
            loadVotings();
        } catch (error) {
            console.error("Error:", error);
            alert("Error");
        }
    };
    

    return (
        <div className="container my-4">
            <div className="row">
                {votings.map((voting) => (
                    <div key={voting.permalink} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        
                        <VotingCard 
                            voting={voting} 
                            user={user} 
                            onVote={handleVote} 
                            onDelete={handleDeleteVoting} 
                        />
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
