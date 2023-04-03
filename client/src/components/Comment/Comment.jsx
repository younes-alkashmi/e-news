import "./Comment.css";
import { FaRegTrashAlt } from "react-icons/fa";

function Comment({
  handleDel,
  desc,
  username,
  profilePicture,
  userId,
  id,
  _id,
}) {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    desc && (
      <div className="comment-card">
        <div className="comment-card-header">
          <div> {desc}</div>
          {userId === id ? (
            <FaRegTrashAlt className="del-com" onClick={() => handleDel(_id)} />
          ) : (
            ""
          )}
        </div>
        <div className="card-footer">
          <img
            className="com-img"
            src={profilePicture ? pf + profilePicture : pf + "male_avatar.png"}
            alt=""
          />
          <span>{username}</span>
        </div>
      </div>
    )
  );
}

export default Comment;
