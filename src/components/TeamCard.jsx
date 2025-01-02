import { Link } from "react-router-dom";

function TeamCard({ team }) {
    return (
        <div className="dflex card h-100">
        <img
          src={team.logoUrl}
          className="card-img-top"
          alt={`${team.name}`}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{team.name}</h5>
          <p className="card-text text-muted">Twitter: {team.twitter}</p>
          <div>
            <Link className="btn btn-outline-primary mt-2"
            to={`/edit-team/${team.name}`}>Editar</Link>
            <button className="btn btn-danger mx-2">Eliminar</button>
          </div>
        </div>
      </div>
    );
} 

export default TeamCard;