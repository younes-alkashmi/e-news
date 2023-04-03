/* eslint-disable */
import "./ProfileCard.css";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileCard({ location }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="profile-card">
      <div className="profile-images">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "default_cover.jpg"
          }
          alt=""
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "male_avatar.png"
          }
          alt=""
        />
      </div>

      <div className="profile-name">
        <span>{user.username}</span>
        <span className="30-letter">{user.bio}</span>
      </div>

      <div className="follow-status">
        <hr />
        <div className="follow-blocks">
          <div className="follow">
            <span>{user.followers && user.followers.length}</span>
            <span>متابعين</span>
          </div>

          <div className="vertical-line"> </div>

          <div className="follow">
            <span>{user.following && user.following.length}</span>
            <span>يتابع</span>
          </div>
        </div>
        <hr />
      </div>

      {location === "homepage" ? (
        <Link to={`/profile/${user._id}`} className="button view-my-prof">
          حسابي
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ProfileCard;
