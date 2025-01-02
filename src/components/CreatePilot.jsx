import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreatePilot() {

    let navigate = useNavigate();

    const [pilot, setPilot] = useState({
        id: "",
        name: "",
        surname: "",
        initials: "",
        imageUrl: "",
        country: "",
        twitter: "",
        team: ""
    });

    const [teams, setTeams] = useState([]);

    const {id, name, surname, initials, imageUrl, country, twitter, team} = pilot;

    const onInputChange = (e) => {
        console.log(`Updating field: ${e.target.name}, Value: ${e.target.value}`);
        setPilot({ ...pilot, [e.target.name]: e.target.value });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
    
        console.log("Datos enviados:", pilot); // Verify the data before submission
    
        if (!pilot.team) {
            alert("Por favor, seleccione un equipo.");
            return;
        }
    
        try {
            const payload = {
                ...pilot,
                team: pilot.team, // Ensure this matches the backend's expected format
            };
            await axios.post("http://localhost:8000/pilots", payload);
            navigate("/pilots");
        } catch (error) {
            console.error("Error details:", error); // Log the full error object
            console.error("Error response:", error.response?.data || error.message); // Log specific response details
            alert("Error creando piloto: " + (error.response?.data?.message || error.message));
        }
    };
    

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get("http://localhost:8000/teams");
                console.log("Teams fetched:", response.data); // Log the fetched teams
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching teams: ", error);
            }
        };
    
        fetchTeams();
    }, []);
    


return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center m-4">AÑADIR PILOTO</h2>

                    <form onSubmit={(e)=>onSubmit(e)}>


                    <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                        Nombre:
                    </label>
                     <input
                     type={"text"}
                     className="form-control"
                     placeholder="Nombre del piloto"
                     name="name"
                     value={name} 
                     onChange={(e)=>onInputChange(e)}
                     />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="Surname" className="form-label">
                        Apellidos:
                    </label>
                     <input
                     type={"text"}
                     className="form-control"
                     placeholder="Apellido(s) del piloto"
                     name="surname"
                     value={surname} 
                     onChange={(e)=>onInputChange(e)}
                     />
                    </div>


                    <div className="mb-3">
                    <label htmlFor="id" className="form-label">
                        Número de Dorsal:
                    </label>
                     <input
                     type={"text"}
                     className="form-control"
                     placeholder="Dorsal del piloto"
                     name="id"
                     value={id} 
                     onChange={(e)=>onInputChange(e)}
                     />
                    </div>


                    <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">
                        Foto del piloto:
                    </label>
                     <input
                     type={"text"}
                     className="form-control"
                     placeholder="Foto del piloto"
                     name="imageUrl"
                     value={imageUrl} 
                     onChange={(e)=>onInputChange(e)}
                     />
                    </div>


                    <div className="mb-3">
                    <label htmlFor="initials" className="form-label">
                        Iniciales:
                    </label>
                     <input
                     type={"text"}
                     className="form-control"
                     placeholder="Iniciales del piloto"
                     name="initials"
                     value={initials} 
                     onChange={(e)=>onInputChange(e)}
                     />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                        Nacionalidad:
                    </label>
                     <input
                        type={"text"}
                        className="form-control"
                        placeholder="Pais del piloto"
                        name="country"
                        value={country}
                        onChange={(e)=>onInputChange(e)}
                     />
                    </div>


                    <div className="mb-3">
                    <label htmlFor="twitter" className="form-label">
                        Twitter:
                    </label>
                     <input
                        type={"text"}
                        className="form-control"
                        placeholder="Insertar usuario de Twitter"
                        name="twitter"
                        value={twitter}
                        onChange={(e)=>onInputChange(e)}
                     />
                    </div>

                    <div className="mb-3">
                            <label htmlFor="team" className="form-label">
                                Equipo:
                            </label>
                            <select
                                className="form-control"
                                name="team"
                                value={team}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value="">Seleccione un equipo</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.name}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    <button type="submit" className="btn btn-outline-danger">Añadir piloto</button>
                    <Link type="submit" className="btn btn-outline-secondary ms-2" to="/pilots">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>

      );
    };

export default CreatePilot;