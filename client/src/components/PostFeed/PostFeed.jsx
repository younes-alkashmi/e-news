/* eslint-disable */
import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeLine } from "../../actions/PostAction";
import "./PostFeed.css";
import { useParams } from "react-router-dom";
import noPosts from "../images/empty.png";
const Post = lazy(() => import("../Post/Post"));

function PostFeed({ location }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const { users } = useSelector((state) => state.UserReducer);
  let { posts, loading } = useSelector((state) => state.PostReducer);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimeLine(params.id || user._id));
  }, [params.id]);
  let sharedBy = null;
  if (location && location === "profilePage") {
    const userParam = users.filter((usr) => usr._id === params?.id);
    const shares = userParam[0]?.shares;
    posts = posts.filter(
      (post) => post.userId === params.id || shares?.includes(post._id)
    );
    sharedBy = userParam[0] || null;
  }

  if (!posts || posts.length === 0)
    return (
      <div
        style={{
          alignItems: "center",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img src={noPosts} alt="" style={{ width: "20rem", height: "20rem" }} />
        ...لا يوجد منشورات لعرضها
      </div>
    );

  return (
    <div className="post-feed">
      {loading ? (
        <span style={{ margin: "auto" }}>...يتم تحميل البيانات</span>
      ) : (
        posts.map((post) => (
          <Post data={post} key={post._id} sharedBy={sharedBy} />
        ))
      )}
    </div>
  );
}

export default PostFeed;
