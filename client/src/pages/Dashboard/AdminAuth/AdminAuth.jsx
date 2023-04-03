import "../../Auth/Auth.css";
import "./AdminAuth.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLog } from "../../../actions/AuthAction";

function AdminAuth() {
  const [confirm, setConfirm] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AuthReducer.loading);
  const err = useSelector((state) => state.AuthReducer.error);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username && data.password) {
      dispatch(adminLog(data));
    } else {
      setConfirm(false);
    }
  };

  return (
    <div className="container">
      <div className="auth" style={{ flexDirection: "row-reverse" }}>
        {/* Right Side */}
        <div className="logo">
          <h1 style={{ fontWeight: "bold" }}> E NEWS </h1>
          <h6>Welcome our Admin</h6>
        </div>

        {/* Left Side */}
        <div className="form-side">
          <h3 style={{ fontWeight: "700" }}>Login</h3>
          <form>
            <div className="name-container">
              <input
                type="text"
                name="username"
                placeholder="Username/Email"
                onChange={handleChange}
                value={data.username}
                style={{ gap: ".5rem", direction: "ltr" }}
              />
            </div>
            <div className="pass-contianer">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={data.password}
                style={{ direction: "ltr" }}
              />
            </div>
            <span
              className="confirm"
              style={{
                display: confirm && !err ? "none" : "block",
                textAlign: "left",
                width: "100%",
              }}
            >
              {err ? "Invalid credentials*" : "Both fields are required*"}
            </span>
            <div className="button-container">
              <button
                className="button sign-btn"
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                style={{ fontFamily: "sans-serif", fontWeight: "500" }}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminAuth;
