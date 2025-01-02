import React from "react";
import { Link } from "react-router-dom";

function CalendarCard({ race }) {
  const formattedDate = new Date(race.date).toLocaleDateString();

  return (
    <div className="card h-100">
      <div className="card-body text-center">
        <h5 className="card-title">{race.name}</h5>
        <p className="card-text text-muted">Date: {formattedDate}</p>
        <p className="card-text text-muted">City: {race.city}</p>
        <div>
          <Link
            className="btn btn-outline-primary mt-2"
            to={`/edit-calendar/${race.name}`}
          >
            Edit
          </Link>
          <button className="btn btn-danger mx-2 mt-2">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CalendarCard;
