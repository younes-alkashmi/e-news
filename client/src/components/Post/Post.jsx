import React, { lazy, useState } from "react";
import comment from "../images/comment.png";
import share from "../images/share.png";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import "./Post.css";
import { likePost, sharePost } from "../../api/PostRequest";
import { addComment, deleteComment } from "../../actions/PostAction";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const PostModal = lazy(() => import("../PostModal/PostModal"));
const Comment = lazy(() => import("../Comment/Comment"));

let userPost = null;
function Post({ data }) {
  const params = useParams();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const { users } = useSelector((state) => state.UserReducer);
  const [comments, setComments] = useState(() => data?.comments);
  const [liked, setLiked] = useState(() => data?.likes.includes(user._id));
  const [likes, setLikes] = useState(data?.likes.length);
  const postUser = users.filter((user) => user._id === data.userId);
  const [isActive, setActive] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [empty, setEmpty] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const dispatch = useDispatch();
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleDel = (_id) => {
    setComments([...comments.filter((c) => c._id !== _id)]);
    dispatch(deleteComment(_id));
  };

  const handleUserComment = (e) => {
    setUserComment(e.currentTarget.value);
    if (e.currentTarget.value === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    likePost(data._id, user._id);
  };

  const profileView = () => {
    if (data.userId === user._id) {
      <Link to={`/profile/${user._id}`} />;
    } else {
      <Link to={`/userprofile/${params.id}`} />;
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      postId: data._id,
      comment: userComment,
      userId: user._id,
      createdAt: Date.now(),
    };

    dispatch(addComment(data._id, commentData));

    setComments(() => [...comments, commentData]);
    setUserComment("");
    setEmpty(true);
  };

  const showComment = () => {
    setActive((prev) => !prev);
  };

  const notlike = (
    <BsHeart className="icon" size="1.5rem" onClick={handleLike} />
  );
  const like = (
    <BsHeartFill className="icon like" size="1.5rem" onClick={handleLike} />
  );

  const sharePosts = (e) => {
    sharePost(data._id, user._id);
    alert("shared");
  };

  return (
    <div className="post">
      <div className="post-head" style={{ position: "relative" }}>
        {user._id === data.userId ? (
          <div id="more-box">
            <FiMoreHorizontal
              size="1.5rem"
              className="more"
              onClick={() => setModalOpened(true)}
            />
            <PostModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={data}
              id="post-model"
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className="name-img" onClick={profileView}>
          <div>
            {user._id === data.userId ? (
              <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none", color: "var(--black)" }}
              >
                {postUser[0].username}
              </Link>
            ) : (
              <Link
                to={`/userprofile/${data.userId}`}
                style={{ textDecoration: "none", color: "var(--black)" }}
              >
                {postUser[0].username}
              </Link>
            )}
          </div>
          <img
            src={
              postUser[0].profilePicture
                ? pf + postUser[0].profilePicture
                : pf + "male_avatar.png"
            }
            alt=" "
          />
        </div>
      </div>
      <div className="post-body">
        <span
          style={{ direction: "rtl" }}
          onClick={() => setShowRest((prev) => !prev)}
        >
          {showRest || data.desc.length < 250
            ? data.desc
            : data.desc.substring(0, 250) + " ..."}
        </span>

        <img src={data.image ? pf + data.image : ""} alt="" />
      </div>
      <div className="post-footer">
        {liked ? like : notlike}
        <img src={comment} alt="" onClick={showComment} />
        <img src={share} alt="" onClick={sharePosts} />
      </div>
      <div className="likes-comments">
        <div>
          <span className="likes">{likes} إعجاب </span>
          <span className="comments"> {comments.length} تعليقات</span>
        </div>
        {data.sharedBy && (
          <div>
            <span className="shared">{data.sharedBy}</span>
          </div>
        )}
      </div>

      <div
        style={{ width: 100 + "%", backgroundcolor: "grey" }}
        className={!isActive ? "hide" : "comment-section"}
      >
        <div className="com-pic">
          <img
            src={
              user.profilePicture
                ? pf + user.profilePicture
                : pf + "male_avatar.png"
            }
            alt=""
          />
          <input
            type="text"
            onChange={handleUserComment}
            value={userComment}
            placeholder="اكتب تعليقا..."
          />
          <button
            type="submit"
            className="button send-comment"
            onClick={handleCommentSubmit}
            disabled={empty}
          >
            إرسال
          </button>
        </div>
        {comments.map((comment) => {
          userPost = users.filter((u) => u._id === comment.userId);
          return (
            <Comment
              key={comment._id}
              handleDel={handleDel}
              id={comment.userId}
              desc={comment.comment}
              username={userPost[0].username}
              profilePicture={userPost[0].profilePicture}
              userId={user._id}
              _id={comment._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Post;
