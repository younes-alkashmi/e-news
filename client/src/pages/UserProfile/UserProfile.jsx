import React, { lazy } from "react";
import "./UserProfile.css";
const LogoSearch = lazy(() => import("../../components/LogoSearch/LogoSearch"));
const InfoCard = lazy(() => import("../../components/InfoCard/InfoCard"));
const IconSide = lazy(() => import("../../components/IconSide/IconSide"));
const PostFeed = lazy(() => import("../../components/PostFeed/PostFeed"));
const NavIcons = lazy(() => import("../../components/NavIcons/NavIcons"));
const ShowingCard = lazy(() =>
  import("../../components/ShowingCard/ShowingCard")
);
const UserProfileCard = lazy(() =>
  import("../../components/UserProfileCard/UserProfileCard")
);

function UserProfile() {
  return (
    <div className="profile-page">
      <div className="userheader">
        <NavIcons location={"user"} />
        <LogoSearch />
      </div>
      <div className="iconside">
        <IconSide />
      </div>
      <div>
        <UserProfileCard />
        <PostFeed location={"profilePage"} />
      </div>

      <div className="infoside">
        <LogoSearch />
        <InfoCard />
        <ShowingCard />
      </div>
    </div>
  );
}

export default UserProfile;
