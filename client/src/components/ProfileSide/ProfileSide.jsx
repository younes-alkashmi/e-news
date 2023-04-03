import "./ProfileSide.css";
import React, { lazy } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
const LogoSearch = lazy(() => import("../LogoSearch/LogoSearch"));
const ShowingCard = lazy(() => import("../ShowingCard/ShowingCard"));

function ProfileSide() {
  return (
    <div className="profileSide">
      <LogoSearch />
      <ProfileCard location="homepage" />
      <ShowingCard />
    </div>
  );
}

export default ProfileSide;
