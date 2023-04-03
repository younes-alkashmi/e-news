import "./Profile.css";
import React, { lazy } from "react";

const LogoSearch = lazy(() => import("../../components/LogoSearch/LogoSearch"));
const InfoCard = lazy(() => import("../../components/InfoCard/InfoCard"));
const PostSide = lazy(() => import("../../components/PostSide/PostSide"));
const IconSide = lazy(() => import("../../components/IconSide/IconSide"));
const NavIcons = lazy(() => import("../../components/NavIcons/NavIcons"));
const ShowingCard = lazy(() =>
  import("../../components/ShowingCard/ShowingCard")
);
const ProfileCard = lazy(() =>
  import("../../components/ProfileCard/ProfileCard")
);

function Profile() {
  return (
    <div className="profile-page">
      <div className="userheader">
        <NavIcons props="profile-page" />
        <LogoSearch />
      </div>
      <div className="iconside">
        <IconSide />
      </div>
      <div>
        <ProfileCard location="profilePage" />
        <PostSide location="profilePage" />
      </div>

      <div className="infoside">
        <LogoSearch />
        <InfoCard />
        <ShowingCard />
      </div>
    </div>
  );
}

export default Profile;
