import React from "react";
import "./TrendCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TrendCard({ trend }) {
  const users = useSelector((state) => state.UserReducer?.users);
  const user = users?.filter((u) => u._id === trend.userId);

  return (
    <div className="trend">
      <Link
        to={`/userprofile/${trend.userId}`}
        style={{ textDecoration: "none", color: "var(--black)" }}
      >
        {user && <div className="name">#{user[0] && user[0].username} </div>}
      </Link>
      <div className="fr-post">{trend.desc.substring(0, 30) + "..."}</div>
      <div className="shares">{trend.likes.length} إعجاب </div>
    </div>
  );
}

export default TrendCard;
