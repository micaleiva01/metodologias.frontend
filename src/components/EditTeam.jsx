import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";


function EditTeam() {

    let navigate = useNavigate();

    const {id} = useParams()

    const [team, setTeam]=useState({
        name: "",
        logoUrl: "",
        twitter: ""
    });

    
    const {name,imageUrl,twitter, } = team;


    const onInputChange = (e) => {
        setTeam({...team, [e.target.name]: e.target.value });
    };


    const loadTeam = useCallback(async () => {
        const result = await axios.get(`http://localhost:8000/teams/${name}`);
        setTeam(result.data);
    }, [name]);

    useEffect(() => {
        loadTeam();
    }, [loadTeam]);


    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/teams/${id}`, team);
        navigate("/teams");
    };


return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center m-4">EDITAR EQUIPO</h2>

                    <form onSubmit={(e)=>onSubmit(e)}>


                    <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                        Nombre:
                    </label>
                     <input
                     type={"text"}
                     className="form-control"
                     placeholder="Nombre del equipo"
                     name="name"
                     value={name} 
                     onChange={(e)=>onInputChange(e)}
                     />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="logoUrl" className="form-label">
                        Logo del equipo:
                    </label>
                     <input
                     type={"text"}
                     className="form-control"
                     placeholder="Logo del equipo"
                     name="logoUrl"
                     value={logoUrl} 
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
                        placeholder="Insertar twitter del equipo"
                        name="twitter"
                        value={twitter}
                        onChange={(e)=>onInputChange(e)}
                     />
                    </div>

                    <button type="submit" className="btn btn-outline-danger">Editar equipo</button>
                    <Link type="submit" className="btn btn-outline-secondary ms-2" to="/">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>

      );
    };

export default EditTeam;