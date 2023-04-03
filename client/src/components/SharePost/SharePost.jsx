import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import "./SharePost.css";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";

function SharePost() {
  const loading = useSelector((state) => state.PostReducer.uploading);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const imgRef = useRef();
  const desc = useRef();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [empty, setEmpty] = useState(true);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(`error in share post file: ${error}`);
      }
    }

    dispatch(uploadPost(newPost));
    reset();
  };

  const handlePostValue = () => {
    if (desc.current.value === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  return (
    <div className="share-post">
      <div className="write">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "male_avatar.png"
          }
          alt=""
        />
        <input
          ref={desc}
          required
          type="text"
          placeholder="ما الذي تريد مشاركته؟"
          onChange={handlePostValue}
        />
      </div>
      <div className="options">
        <div
          className="option"
          style={{ color: "var(--photo)" }}
          onClick={() => imgRef.current.click()}
        >
          <UilScenery />
          <span style={{ margin: "2px" }}> صورة </span>
        </div>
        <div className="option" style={{ color: "var(--video)" }}>
          <UilPlayCircle />
          <span style={{ margin: "2px" }}> فيديو </span>
        </div>
        <div className="option" style={{ color: "var(--location)" }}>
          <UilLocationPoint />
          <span style={{ margin: "2px" }}> الموقع </span>
        </div>
        <div className="option" style={{ color: "var(--schedule)" }}>
          <UilSchedule />
          <span style={{ margin: "2px" }}> تقويم </span>
        </div>
        <button
          className="button share-btn"
          onClick={handleSubmit}
          disabled={empty || loading}
        >
          {loading ? "...تحميل" : "نشر"}
        </button>
        <div style={{ display: "none" }}>
          <input
            type="file"
            name="myImg"
            ref={imgRef}
            onChange={onImageChange}
          />
        </div>
      </div>

      {image && (
        <div className="preview-img">
          <UilTimes onClick={() => setImage(null)} className="uiltimes" />
          <img src={URL.createObjectURL(image)} alt="" />
        </div>
      )}
    </div>
  );
}

export default SharePost;
