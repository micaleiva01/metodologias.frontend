import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateTeam() {

    let navigate = useNavigate();


    const [team, setTeam] = useState({
        name: "",
        logoUrl: "",
        twitter: "",
    });


    const { name, logoUrl, twitter } = team;


    const onInputChange = (e) => {
        setTeam({ ...team, [e.target.name]: e.target.value });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
    
        const teamData = {
            name: team.name,
            logoUrl: team.logoUrl,
            twitter: team.twitter,
        };
    
        try {
            await axios.post("http://localhost:8000/teams", teamData, {
                headers: { "Content-Type": "application/json" },
            });
    
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const updatedUser = { ...storedUser, teamName: { name: team.name } };
            localStorage.setItem("user", JSON.stringify(updatedUser));
    
            navigate(`/teams/${encodeURIComponent(team.name)}`);
        } catch (error) {
            console.error("Error creating team:", error);
    
            const errorMessage =
                error.response?.data?.message || "Failed to create team. Please try again.";
            alert(errorMessage);
        }
    };
    

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center m-4">CREAR EQUIPO</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Insertar nombre del equipo"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="logoUrl" className="form-label">
                                Logo del Equipo (URL):
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Insertar URL del logo"
                                name="logoUrl"
                                value={logoUrl}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="twitter" className="form-label">
                                Twitter:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Insertar usuario de Twitter"
                                name="twitter"
                                value={twitter}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-danger">
                            Añadir equipo
                        </button>
                        <Link className="btn btn-outline-secondary ms-2" to="/">
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateTeam;
