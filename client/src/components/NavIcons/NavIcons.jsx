/* eslint-disable */
import React, { useState } from "react";
// import InfoCard from "../InfoCard/InfoCard";
import { UilSetting } from "@iconscout/react-unicons";
import { HiHome } from "react-icons/hi";
import { RiNotification4Line } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import "./NavIcons.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../actions/UserAction";

function NavIcons({ location }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const { users } = useSelector((state) => state.UserReducer);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const [isNotify, setIsNotify] = React.useState(
    user.notifications?.length > user.notifyCount
  );

  const [shown, setShown] = useState(false);
  const notifyIcon = React.createRef();
  // const infoCard = React.createRef();
  location = location || undefined;

  const showNotify = () => {
    if (user.notifications?.length >= 0) {
      notifyIcon.current.classList.toggle("show");
      setIsNotify(false);
      user.notifyCount = user.notifications?.length;
      dispatch(updateUser(user._id, user));
    }
  };

  window.onclick = (event) => {
    event.preventDefault();
    if (event.target) {
      if (!event.target.matches(".notify-icon")) {
        if (notifyIcon.current && notifyIcon.current.classList)
          notifyIcon.current.classList.value = "dropdown";
      }
      // if (!event.target.matches(".setting")) {
      //   setShown(() => false);
      // }
    }
  };

  const settingClick = (e) => {
    e.preventDefault();
    setShown((current) => !current);
  };

  return (
    <div>
      <div className="nav-icons">
        <Link to={"/home"}>
          <HiHome className="icon active" />
        </Link>
        <UilSetting className="icon setting" onClick={settingClick} />

        {isNotify ? (
          <RiNotification4Line
            size="32px"
            style={{ border: "2px solid var(--main)", borderRadius: "50%" }}
            className="notify-icon"
            onClick={showNotify}
          />
        ) : (
          <RiNotification4Line
            size="32px"
            className="notify-icon"
            onClick={showNotify}
          />
        )}

        <FaBars className="icon bars" />
      </div>
      {/* shown && (
        <div className="infoshown" ref={infoCard}>
          <InfoCard />
        </div>
      ) */}
      <div ref={notifyIcon} className="dropdown">
        {user.notifications && user.notifications.length === 0 ? (
          <span style={{ textAlign: "center" }}>لا توجد إشعارات لعرضها</span>
        ) : (
          user.notifications &&
          user.notifications.map((notif) => {
            const notifyUser = users
              ? users.filter((u) => u._id === notif.userId)
              : {};
            return (
              <div className="notify" key={notif.userId + notif.createdAt}>
                <img
                  src={
                    notifyUser[0] && notifyUser[0].profilePicture
                      ? pf + notifyUser[0].profilePicture
                      : pf + "male_avatar.png"
                  }
                  alt=""
                />
                <span className="notify-cont">{notif.message}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default NavIcons;
