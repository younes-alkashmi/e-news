/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { followUser, unfollowUser } from "../../actions/UserAction";
import "../ProfileCard/ProfileCard.css";

function UserProfileCard() {
  const profileId = useParams().id;
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const { users } = useSelector((state) => state.UserReducer);
  const [profileUser, setProfileUser] = useState(null);
  const [followers, setFollwers] = useState(0);
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(() =>
    user.following.includes(profileId)
  );

  useEffect(() => {
    const fetchUser = async () => {
      const data = users.filter((user) => user._id === profileId);
      setProfileUser(data[0]);
    };
    fetchUser();
  }, [followed, profileId]);

  function handleFollow() {
    setFollowed((prev) => !prev);
    if (followed) {
      dispatch(unfollowUser(profileUser._id, user));
      setFollwers((prev) => prev - 1);
    } else {
      dispatch(followUser(profileUser._id, user));
      setFollwers((prev) => prev + 1);
    }
  }

  return (
    <div className="profile-card">
      <div className="profile-images">
        <img
          src={
            profileUser && profileUser.coverPicture
              ? serverPublic + profileUser.coverPicture
              : serverPublic + "default_cover.jpg"
          }
          alt=""
        />
        <img
          src={
            profileUser && profileUser.profilePicture
              ? serverPublic + profileUser.profilePicture
              : serverPublic + "male_avatar.png"
          }
          alt=""
        />
      </div>

      <div className="profile-name">
        <span>{profileUser && profileUser.username}</span>
        <span className="30-letter">{profileUser && profileUser.bio}</span>
      </div>

      <div className="follow-status">
        <hr />
        <div className="follow-blocks">
          <div className="follow">
            <span>
              {followers && followers > 0
                ? followers
                : profileUser && profileUser.followers.length}
            </span>
            <span>متابعين</span>
          </div>

          <div className="vertical-line"> </div>

          <div className="follow">
            <span>{profileUser && profileUser.following.length}</span>
            <span>يتابع</span>
          </div>
        </div>
        <hr />
      </div>

      <div
        onClick={handleFollow}
        className={
          followed ? "button view-my-prof clicked" : "button view-my-prof"
        }
      >
        {followed ? "تم متابعته" : "متابعة"}
      </div>
    </div>
  );
}

export default UserProfileCard;
