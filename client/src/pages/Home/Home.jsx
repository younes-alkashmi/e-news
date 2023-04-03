import React, { lazy } from "react";
import "./Home.css";

const ProfileSide = lazy(() =>
  import("../../components/ProfileSide/ProfileSide")
);
const IconSide = lazy(() => import("../../components/IconSide/IconSide"));
const PostSide = lazy(() => import("../../components/PostSide/PostSide"));

function Home() {
  return (
    <div className="home">
      <div>
        <IconSide location="homepage" />
      </div>
      <div>
        <PostSide location="homepage" />
      </div>
      <div className="profileside">
        <ProfileSide />
      </div>
    </div>
  );
}
export default Home;
