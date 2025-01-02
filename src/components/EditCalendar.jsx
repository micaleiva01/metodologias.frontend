import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditCalendar() {

    let navigate = useNavigate();

    const { race } = useParams();

    const [calendarEvent, setCalendarEvent] = useState({
        date: "",
        name: "",
        city: "",
    });

    const { date, name, city } = calendarEvent;

    const onInputChange = (e) => {
        setCalendarEvent({ ...calendarEvent, [e.target.name]: e.target.value });
    };

    const loadEvent = useCallback(async () => {
        const result = await axios.get(`http://localhost:8000/calendar/${race}`);
        setCalendarEvent(result.data);
    }, [race]);

    useEffect(() => {
        loadEvent();
    }, [loadEvent]);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/calendar/${race}`, calendarEvent);
        navigate("/calendar/race");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center m-4">Edit Calendar Event</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Event Name:</label>
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
                            <label htmlFor="date" className="form-label">Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={date}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter city"
                                name="city"
                                value={city}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-danger">Edit Event</button>
                        <Link className="btn btn-outline-secondary ms-2" to="/calendar">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCalendar;
