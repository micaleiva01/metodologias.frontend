function TeamCard({ team, isAdmin, onClick }) {
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

        {/* ✅ Admins cannot edit or delete teams */}
        {isAdmin && (
          <div>
            <p className="text-white-50">Solo lectura</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
