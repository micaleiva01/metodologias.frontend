import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditPilot() {
    let navigate = useNavigate();
    const { id } = useParams();
    const pilotId = Number(id);

    const [pilot, setPilot] = useState({
        id: "",
        name: "",
        surname: "",
        initials: "",
        imageUrl: "",
        country: "",
        twitter: "",
        team: { name: "" },
    });

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPilot = useCallback(async () => {
        try {
            console.log(`Cargando piloto con el siguiente ID: ${pilotId}`);
            const result = await axios.get(`http://localhost:8000/pilots/${pilotId}`);
            console.log("Piloto encontrado:", result.data);

            setPilot({
                ...result.data,
                team: result.data.team || { name: "" },
            });

            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setError("Piloto no encontrado.");
            setLoading(false);
        }
    }, [pilotId]);

    const loadTeams = useCallback(async () => {
        try {
            console.log("Buscando equipos...");
            const result = await axios.get("http://localhost:8000/teams");
            console.log("Equipo encontrado:", result.data);

            setTeams(result.data);
        } catch (error) {
            console.error("Error:", error);
        }
    }, []);

    useEffect(() => {
        loadPilot();
        loadTeams();
    }, [loadPilot, loadTeams]);

    const onInputChange = (e) => {
        const { name, value } = e.target;

        setPilot((prevPilot) => ({
            ...prevPilot,
            [name]: name === "team" ? { name: value } : value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        if (!pilot.id) {
            alert("No se puede actualizar un piloto inexistente.");
            return;
        }
    
        console.log("Actualizando piloto:", pilot);
    
        try {
            const response = await axios.put(
                `http://localhost:8000/pilots`,
                pilot,
                { params: { team: pilot.team.name.trim() } }
            );
    
            console.log("Pilot actualizado con éxito:", response.data);
            navigate("/pilots");
        } catch (error) {
            console.error("Error:", error);
    
            if (error.response?.status === 404) {
                alert("El piloto o el equipo no existen en la base de datos.");
            } else {
                alert("Error al actualizar el piloto. Inténtalo de nuevo.");
            }
        }
    };
    

    if (loading) {
        return <h2 className="text-center m-4">Cargando...</h2>;
    }

    if (error) {
        return (
            <div className="container">
                <h2 className="text-center m-4">{error}</h2>
                <Link className="btn btn-outline-secondary ms-2" to="/pilots">
                    Volver
                </Link>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="title text-center m-4">EDITAR PILOTO</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre:</label>
                            <input type="text" className="form-control" name="name" value={pilot.name} onChange={onInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Apellidos:</label>
                            <input type="text" className="form-control" name="surname" value={pilot.surname} onChange={onInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">Número de Dorsal:</label>
                            <input type="text" className="form-control" name="id" value={pilot.id} readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="imageUrl" className="form-label">Foto del piloto:</label>
                            <input type="text" className="form-control" name="imageUrl" value={pilot.imageUrl} onChange={onInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="initials" className="form-label">Iniciales:</label>
                            <input type="text" className="form-control" name="initials" value={pilot.initials} onChange={onInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Nacionalidad:</label>
                            <input type="text" className="form-control" name="country" value={pilot.country} onChange={onInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="twitter" className="form-label">Twitter:</label>
                            <input type="text" className="form-control" name="twitter" value={pilot.twitter} onChange={onInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="team" className="form-label">Equipo:</label>
                            <select className="form-control" name="team" value={pilot.team.name} onChange={onInputChange}>
                                <option value="">Selecciona un equipo</option>
                                {teams.map((team) => (
                                    <option key={team.name} value={team.name}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-outline-danger">Editar piloto</button>
                        <Link className="btn btn-outline-secondary ms-2" to="/pages/pilots">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPilot;
