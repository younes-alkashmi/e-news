import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./PostModal.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { uploadImage } from "../../actions/UploadAction";
import { updatePost, deletePost } from "../../actions/PostAction";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

const PostModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(data);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let postData = formData;

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      postData.image = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    dispatch(updatePost(postData._id, postData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.5}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      radius="1rem"
    >
      <form className="info-form" onSubmit={handleSubmit}>
        <h3>تعديل </h3>
        <div>
          <textarea
            value={formData.desc}
            onChange={handleChange}
            type="text"
            placeholder="الموضوع"
            name="desc"
            className="info-input desc"
            style={{ height: 100 + "px" }}
          />
        </div>

        <div className="pics-container">
          <div>
            تعديل الصورة:
            <input type="file" name="image" onChange={onImageChange} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 30 + "px" }}>
          <button
            style={{ fontSize: "14px" }}
            className="button edit-btn"
            type="submit"
          >
            تعديل
            <FaEdit className="edit-icon" />
          </button>
          <button
            className="button edit-btn"
            onClick={() => dispatch(deletePost(data._id, data))}
          >
            حذف
            <FaRegTrashAlt className="edit-icon" />
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PostModal;
