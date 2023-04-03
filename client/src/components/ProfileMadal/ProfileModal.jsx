import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./ProfileModal.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const param = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;

    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="info-form" onSubmit={handleSubmit}>
        <h3>معلوماتك</h3>
        <div>
          <input
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="اسم المستخدم"
            name="username"
            className="info-input"
          />
        </div>
        <div>
          <input
            value={formData.bio}
            onChange={handleChange}
            type="text"
            placeholder=" نبذة مختصرة"
            name="bio"
            className="info-input"
          />
        </div>

        <div>
          <input
            value={formData.workField}
            onChange={handleChange}
            type="text"
            placeholder="نطاق العمل"
            name="workField"
            className="info-input"
          />
        </div>

        <div>
          <input
            value={formData.city}
            onChange={handleChange}
            type="text"
            placeholder="المدينة"
            name="city"
            className="info-input"
          />
        </div>

        {formData.isEditor && (
          <div>
            <input
              value={formData.startDate}
              onChange={handleChange}
              type="text"
              className="info-input"
              placeholder="التأسيس"
              name="startDate"
            />
          </div>
        )}

        <div className="pics-container">
          <div>
            الصورة الشخصية:
            <input type="file" name="profileImage" onChange={onImageChange} />
          </div>
          <div>
            صورة الغلاف:
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>
        </div>
        <button className="button info-button" type="submit">
          تحديث
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
