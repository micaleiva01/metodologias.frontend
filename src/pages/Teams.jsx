import React from 'react';
import TeamList from '../components/TeamList';


function Teams() {
  return (
    <div className="Teams">
        <header className="teams-header">
            <h1>F1 Teams</h1>
        </header>
      <main>
        <TeamList />
      </main>
    </div>
  );
}

export default Teams;
