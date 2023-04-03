/* eslint-disable */

import logo from "../../components/images/blue-feather.png";
import adminImg from "../../components/images/admin.png";
import React from "react";
import { RiNotification4Line } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { HiUsers, HiLogout } from "react-icons/hi";
import "./Header/Header.css";
import { updateAdmin } from "../../actions/UserAction";
import { logout } from "../../actions/AuthAction";
import { BiSearch } from "react-icons/bi";

import "./Table/Table.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { approveUsers, getUsers, removeUsers } from "../../actions/UserAction";

import "./Dashboard.css";
import "../../components/LogoSearch/LogoSearch.css";

function Dashboard() {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedText, setSearchText] = useState("");

  let { users } = useSelector((state) => state.UserReducer);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [editors, setEditors] = useState(false);
  const [list, setList] = useState(users ? [...users] : []);
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();
  const admin = useSelector((state) => state.AuthReducer.authData?.admin);
  const [isActive, setisActive] = React.useState(
    admin.usersCount < users?.length
  );
  const notificationIcon = React.createRef();
  const logoutRef = React.useRef();

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

  const handleSearch = (e) => {
    console.log("you");
    console.log(e.target.value);
    setSearchText(e.target.value.trim());
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (users) {
      const searched = users.filter((user) =>
        user.username.includes(searchedText)
      );
      if (searchedText)
        setList(() =>
          searched.sort((a, b) => {
            return a.username[0] !== searchedText ? 1 : -1;
          })
        );
      else setList(users);
    }
  }, [searchedText]);

  // useEffect(() => {
  //   searchedUsers.length > 0 ? setList(searchedUsers) : setList(users);
  // }, [searchedUsers]);

  const userCheck = (e) => {
    if (e.target.tagName === "TR") {
      e.target.classList.toggle("activated");
      toggleUser(e.target.children[2].innerText);
    } else if (e.target.tagName === "TD") {
      e.target.parentElement.classList.toggle("activated");
      toggleUser(e.target.parentElement.children[2].innerText);
    }
  };

  function toggleUser(email) {
    if (checkedUsers.includes(email)) {
      setCheckedUsers((prevList) => [
        ...prevList.filter((prev) => prev !== email),
      ]);
    } else {
      setCheckedUsers((prevList) => [...prevList, email]);
    }
  }

  const filterUsers = () => {
    if (!editors) {
      setList([...users.filter((user) => user.gender === "firm")]);
    } else {
      setList([...users]);
    }
    setEditors((prev) => !prev);
    resetLists();
  };

  const approval = () => {
    users.map((user) => {
      checkedUsers.map((email) => {
        if (email === user.email) {
          if (user.gender === "firm") user.isEditor = true;
          else {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
          }
        }
      });
    });
    dispatch(approveUsers(checkedUsers));
    setList([...users]);
    resetLists();
  };

  const removal = () => {
    dispatch(removeUsers(checkedUsers));
    const arr = [];
    for (let i = 0; i < users.length; i++) {
      let flag = true;
      for (let j = 0; j < checkedUsers.length; j++) {
        if (users[i].email === checkedUsers[j]) {
          flag = false;
        }
      }
      if (flag) {
        arr.push(users[i]);
      }
    }
    users = [...arr];
    setList([...arr]);
    resetLists();
  };

  function resetLists() {
    setCheckedUsers([]);
    document
      .querySelectorAll("tr")
      .forEach((tr) => tr.classList.remove("activated"));
  }

  // <Table />
  return (
    <div className="dashboard-app">
      {/* ********** Header *********** */}

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
          <img
            src={adminImg}
            style={{ width: "30px", height: "30px" }}
            alt=""
          />
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

      {/* ********** Table ******* */}

      <div className="table-con">
        <div className="upper-table">
          <div
            className="left-head"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            <span>
              {checkedUsers.length}
              <span> rows selected</span>
            </span>
            <span>
              {editors ? (
                <BsToggleOn onClick={filterUsers} size={22} />
              ) : (
                <BsToggleOff onClick={filterUsers} size={22} />
              )}
              Filter non-eidtors
            </span>
            <span style={{ color: "red" }}>
              {showMessage ? "Regural users can not be approved" : ""}
            </span>
          </div>
          <div>
            <button
              type="submit"
              className="button"
              disabled={checkedUsers.length === 0}
              onClick={approval}
            >
              Accept
            </button>
            <button
              type="submit"
              className="button"
              disabled={checkedUsers.length === 0}
              onClick={removal}
            >
              Remove
            </button>
          </div>
        </div>
        {list.length === 0 ? (
          <div
            style={{
              height: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "red",
              fontWeight: "500",
              fontSize: "1.2rem",
            }}
          >
            There are no such users
          </div>
        ) : (
          <table>
            <caption
              style={{
                textAlign: "left",
                marginLeft: "10px",
                fontSize: "1.2rem",
                color: "var(--main)",
                fontWeight: "600",
              }}
            >
              Users list
            </caption>

            <thead className="table-child">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Editor</th>
                <th>Date</th>
                <th>Type</th>
                <th>Document</th>
              </tr>
            </thead>

            <tbody className="table-child">
              {list &&
                list.map((user, idx) => {
                  return (
                    <tr key={user._id} className="name" onClick={userCheck}>
                      <td>{idx + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.isEditor ? "Editor" : "Not Editor"}</td>
                      <td>{user.createdAt.slice(0, 10)}</td>
                      <td>{user.gender}</td>
                      <td>
                        <Link
                          className={
                            user.gender !== "firm" ? "disable-link" : ""
                          }
                          to={`/dashboard/image`}
                          onMouseOver={async () =>
                            await (window.localStorage.image = user.document)
                          }
                          target="_blank"
                        >
                          <button
                            disabled={user.gender !== "firm"}
                            className="button show-btn"
                          >
                            Show
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
