import { Link } from "react-router-dom";

function TeamCard({ team, onDelete, onClick }) {
  return (
    <div
      className="card h-100"
      onClick={onClick}
      style={{ cursor: "pointer", transition: "transform 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={team.logoUrl}
        className="card-img-top"
        alt={team.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{team.name}</h5>
        <p className="card-text text-muted">Twitter: {team.twitter}</p>
        <div>
          <Link
            className="btn btn-outline-primary mt-2"
            to={`/edit-team/${encodeURIComponent(team.name)}`}
            onClick={(e) => e.stopPropagation()}
          >
            Edit
          </Link>
          <button
            className="btn btn-danger mx-2 mt-2"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm("Are you sure you want to delete this team?")) {
                console.log(`Deleting team: ${team.name}`);
                onDelete(team.name);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;