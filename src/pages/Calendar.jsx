import React from "react";
import CalendarList from "../components/CalendarList";

function Calendar() {
    return (
        <div>
            <header className="teams-header">
                <h1 className="title text-center">CALENDARIO</h1>
            </header>
            <main>
            <CalendarList />
            </main>
        </div>
    );
}

export default Calendar;