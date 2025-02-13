import React from "react";
import CircuitList from "../components/CircuitList";

function Circuits() {
    return (
        <div>
            <header className="teams-header">
                <h1 className="title text-center">CIRCUITOS</h1>
            </header>
            <main>
                <CircuitList />
            </main>
        </div>
    );
}

export default Circuits;