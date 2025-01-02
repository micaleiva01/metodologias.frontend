import React from "react";
import { Link } from "react-router-dom";
import CalendarList from "../components/CalendarList";

function Calendar() {
    return (
        <div>
            <header className="teams-header">
                <h1 className="title text-center">CALENDARIO</h1>
            </header>
            <main>
            <CalendarList />
            <Link to="/create-calendar" style={{ textDecoration: "underline", color: "white" }}>
                Crear una carrera
            </Link>
            </main>
        </div>
    );
}

export default Calendar;