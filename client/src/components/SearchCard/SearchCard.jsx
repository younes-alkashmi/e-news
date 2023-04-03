import "./SearchCard.css";
import { Link } from "react-router-dom";

function SearchCard({ user, setSearchText }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className=" fol">
      {user && (
        <div className="container">
          <Link
            to={`/userprofile/${user._id}`}
            style={{ textDecoration: "none" }}
            onClick={() => setSearchText}
          >
            <div className="image-name-con">
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
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchCard;
