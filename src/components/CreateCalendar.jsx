import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateCalendar() {

    let navigate = useNavigate();

    const [calendarEvent, setCalendarEvent] = useState({
        date: "",
        name: "",
        city: "",
    });

    const { date, name, city } = calendarEvent;

    const onInputChange = (e) => {
        console.log(`Updating field: ${e.target.name}, Value: ${e.target.value}`);
        setCalendarEvent({ ...calendarEvent, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log("Carrera creada:", calendarEvent);

        try {
            await axios.post("http://localhost:8000/calendar", calendarEvent);
            navigate("/calendar/race");
        } catch (error) {
            console.error("Error details:", error);
            console.error("Error response:", error.response?.data || error.message);
            alert("Error creating calendar event: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center m-4">Añadir Carrera</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre de la carrera:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter event name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Fecha:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={date}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Ciudad:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter city"
                                name="city"
                                value={city}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-danger">Añadir Carrera</button>
                        <Link className="btn btn-outline-secondary ms-2" to="/calendar">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateCalendar;
