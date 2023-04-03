import logo from "../../../components/images/blue-feather.png";
import adminImg from "../../../components/images/admin.png";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiNotification4Line } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { HiUsers, HiLogout } from "react-icons/hi";
import "./Header.css";
import { updateAdmin } from "../../../actions/UserAction";
import { logout } from "../../../actions/AuthAction";
import { BiSearch } from "react-icons/bi";

function Header({ handleSearch }) {
  const admin = useSelector((state) => state.AuthReducer.authData?.admin);
  const { users } = useSelector((state) => state.UserReducer);
  const [isActive, setisActive] = React.useState(
    admin.usersCount < users?.length
  );
  const notificationIcon = React.createRef();
  const logoutRef = React.useRef();
  const dispatch = useDispatch();

  const showNotification = () => {
    notificationIcon.current.classList.toggle("show");
    admin.usersCount = users.length;
    dispatch(updateAdmin(admin._id, admin));
    setTimeout(() => changeActive(), 3000);
  };

  const changeActive = () => {
    setisActive(false);
  };

  const moreClick = () => {
    logoutRef.current.classList.toggle("show");
  };

  return (
    <header className="dashboard">
      <div className="logo-box">
        <img style={{ width: "30px", height: "30px" }} src={logo} alt="" />
        <span>E-NEWS</span>
      </div>
      <div className="search-box" style={{ width: "30%" }}>
        <div className="search-bar">
          <BiSearch
            size="26px"
            color="var(--main)"
            style={{ cursor: "pointer" }}
          />
          <input
            type="text"
            placeholder="search now..."
            onChange={handleSearch}
            style={{ direction: "ltr" }}
          />
        </div>
      </div>
      <div className="more-box">
        {isActive && <span className="notif-dot"></span>}
        <RiNotification4Line
          size="20px"
          style={{ cursor: "pointer" }}
          className={"notification-icon"}
          onClick={showNotification}
        />
        <img src={adminImg} style={{ width: "30px", height: "30px" }} alt="" />
        <BsThreeDots
          className="logout-dots"
          size="20px"
          style={{ cursor: "pointer" }}
          onClick={moreClick}
        />

        <div ref={logoutRef} className="dropdown-logout">
          <div className="logout">
            <HiLogout />
            <span
              className="logout-cont"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <span>Logout</span>
            </span>
          </div>
        </div>

        <div ref={notificationIcon} className="dropdown-noti">
          <div className="notification">
            <HiUsers />
            <span className="notification-cont">
              {isActive ? "يوجد مستخدمين جدد" : "لا يوجد مستخدمين جدد حاليا"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
