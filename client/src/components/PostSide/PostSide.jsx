import React, { lazy } from "react";
import "./PostSide.css";
import { useSelector } from "react-redux";
const SharePost = lazy(() => import("../SharePost/SharePost"));
const PostFeed = lazy(() => import("../PostFeed/PostFeed"));

function PostSide({ location }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);

  return (
    <div className="post-side">
      {user.isEditor && <SharePost />}
      <PostFeed location={location} />
    </div>
  );
}

export default PostSide;
