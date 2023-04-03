import "bootstrap/dist/css/bootstrap.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import notFound from "./components/images/page-not-found.png";
import DoucmentModal from "./pages/Dashboard/DocumentModal/DocumentModal";
import warning from "./img/warning-sign.png";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Auth = lazy(() => import("./pages/Auth/Auth"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const AdminAuth = lazy(() => import("./pages/Dashboard/AdminAuth/AdminAuth"));
const MobileHome = lazy(() => import("./pages/Mobile/Home/MobileHome"));
const Welcome = lazy(() => import("./pages/Welcome/Welcome"));

function App() {
  const user = useSelector((state) => state.AuthReducer.authData?.user);
  const admin = useSelector((state) => state.AuthReducer.authData?.admin);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return user && user.status === "pending" ? (
    <div
      style={{
        width: "100%",
        height: "99vh",
        backgroundColor: "var(--inputColor)",
        padding: "50px",
      }}
    >
      <div className="pending-account">
        <img src={warning} className="warning" alt="" /> <br />
        <span>الحساب معلق</span>
        <br /> يرجى التحقق من بريدك الإلكتروني
      </div>
      {localStorage.clear()}
    </div>
  ) : (
    <div className="App">
      {!admin && user && (
        <div className="blur" style={{ top: "-18%", left: "0" }}></div>
      )}
      {!admin && user && (
        <div className="blur" style={{ top: "36%", right: "-10%" }}></div>
      )}
      <Suspense
        fallback={
          <div style={{ height: "99vh" }}>
            <Spinner
              style={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "transform(-50%)",
              }}
              animation="grow"
              variant="danger"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/confirm/:confirmationCode" element={<Welcome />} />

          <Route
            path="/"
            element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
          />
          <Route
            path="/home"
            element={
              windowSize.innerWidth < 768 && user ? (
                <MobileHome />
              ) : user ? (
                <Home />
              ) : (
                <Navigate to="../auth" />
              )
            }
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="../home" /> : <Auth />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}
          />
          <Route
            path="/userprofile/:id"
            element={user ? <UserProfile /> : <Navigate to="../auth" />}
          />
          <Route
            path="/dashboard"
            element={admin ? <Dashboard /> : <AdminAuth />}
          />
          <Route
            path="/dashboard/image"
            element={admin ? <DoucmentModal /> : <AdminAuth />}
          />

          <Route
            path="*"
            element={
              <div className="page-not-found">
                <div>
                  <img src={notFound} alt="" />
                  <p> الصفحة غير موجودة</p>

                  <Spinner
                    style={{ width: "3.5rem", height: "3.5rem" }}
                    animation="grow"
                    variant="danger"
                  />
                </div>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
