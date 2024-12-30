import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";


function EditPilot() {

    let navigate = useNavigate();

    const {id} = useParams()

    const [pilot, setPilot]=useState({
        id: "",
        name: "",
        surname: "",
        initials: "",
        imageUrl: "",
        country: "",
        twitter: ""
    });

    
    const {name, surname, initials, imageUrl, country, twitter, team} = pilot;


    const onInputChange = (e) => {
        setPilot({...pilot, [e.target.name]: e.target.value });
    };


    const loadPilot = useCallback(async () => {
        const result = await axios.get(`http://localhost:8000/pilots/${id}`);
        setPilot(result.data);
    }, [id]);

    useEffect(() => {
        loadPilot();
    }, [loadPilot]);


    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/pilots/${id}`, pilot);
        navigate("/pilots");
    };


return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center m-4">EDITAR PILOTO</h2>

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
                     <input
                        type={"text"}
                        className="form-control"
                        placeholder="Equipo del piloto"
                        name="team"
                        value={team}
                        onChange={(e)=>onInputChange(e)}
                     />
                    </div>

                    <button type="submit" className="btn btn-outline-danger">Editar piloto</button>
                    <Link type="submit" className="btn btn-outline-secondary ms-2" to="/">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>

      );
    };

export default EditPilot;