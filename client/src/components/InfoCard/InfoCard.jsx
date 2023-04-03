/* eslint-disable */

import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
import { logout } from "../../actions/AuthAction";
import ProfileModal from "../ProfileMadal/ProfileModal";

function InfoCard() {
  const dispatch = useDispatch();
  const params = useParams();

  const profileId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await UserApi.getUser(profileId ? profileId : user._id);
      setProfileUser(data);
    };
    fetchProfile();
  }, [profileId, modalOpened]);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="info-card">
      <div className="info-head">
        <h4>
          {user._id === profileUser._id
            ? "معلوماتك"
            : `نبذة عن ${profileUser.username}`}
        </h4>

        {user._id === profileUser._id ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>المكان</b>
        </span>
        <span> {profileUser.city} </span>
      </div>

      <div className="info">
        <span>
          <b> نطاق العمل </b>
        </span>
        <span> {profileUser.workField} </span>
      </div>

      {profileUser.isEditor && (
        <div className="info">
          <span>
            <b>التأسيس</b>
          </span>
          <span> {profileUser.startDate} </span>
        </div>
      )}

      <div className="info">
        <span>
          <b> البريد الإلكتروني </b>
        </span>
        <span> {profileUser.email} </span>
      </div>

      <div className="info">
        <span>
          <b> نبذة مختصرة</b>
        </span>
        <span> {profileUser.bio} </span>
      </div>

      {user._id === profileUser._id && (
        <div className="log-con">
          <button className="button log-out-btn" onClick={handleLogout}>
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}

export default InfoCard;
