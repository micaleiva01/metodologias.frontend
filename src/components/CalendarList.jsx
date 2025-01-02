import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CalendarList() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    loadCalendarRaces();
  }, []);

  const loadCalendarRaces = async () => {
    try {
      const response = await axios.get("http://localhost:8000/calendar");
      setRaces(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="container my-4">
      <div className="list-group">
        {races.map((race, index) => (
          <div key={index} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{race.name}</h5>
              <small>{new Date(race.date).toLocaleDateString()}</small>
            </div>
            <p className="mb-1">City: {race.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarList;