import React from "react";
import RacesList from "../components/RacesList";

function Calendar() {
    return (
        <div>
            <header className="teams-header">
                <h1 className="title text-center">CALENDARIO</h1>
            </header>
            <main>
                <RacesList />
            </main>
        </div>
    );
}

export default Calendar;