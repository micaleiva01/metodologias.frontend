import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateTeam() {
    let navigate = useNavigate();

    const [team, setTeam] = useState({
        name: "",
        logoUrl: null,
        twitter: "",
    });

    const { name, twitter } = team;

    const onInputChange = (e) => {
        if (e.target.name === "logoUrl") {
            setTeam({ ...team, [e.target.name]: e.target.files[0] });
        } else {
            setTeam({ ...team, [e.target.name]: e.target.value });
        }
    };


    const onSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", team.name);
        formData.append("logoUrl", team.logoUrl); // Must be the File object
        formData.append("twitter", team.twitter);
    
        try {
            await axios.post("http://localhost:8000/teams", formData);
            navigate("/teams");
        } catch (error) {
            // Display error message properly
            console.error("Error creating team:", error);
    
            // Show the server's error message if available
            const errorMessage = error.response?.data || "Failed to create team. Please try again.";
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
                                Logo del Equipo:
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                name="logoUrl"
                                accept="image/*"
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
