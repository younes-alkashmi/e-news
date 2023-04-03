import "../ShowingCard/ShowingCard.css";
import { Link } from "react-router-dom";

function user({ user }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="followed">
      <div className="container">
        <div>
          <img
            src={
              user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + "male_avatar.png"
            }
            alt=""
          />
          <span className="user-name">{user.username}</span>
        </div>
        <Link
          to={`/userprofile/${user._id}`}
          className="button view-button"
          style={{ textDecoration: "none" }}
        >
          عرض
        </Link>
      </div>
    </div>
  );
}

export default user;
