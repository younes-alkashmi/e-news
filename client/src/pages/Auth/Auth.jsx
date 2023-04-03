import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";
import { uploadImage } from "../../actions/UploadAction";
import { UilScenery } from "@iconscout/react-unicons";
import { MdErrorOutline } from "react-icons/md";
import "./Auth.css";

function Auth() {
  const [signedUp, setsignedUp] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    document: "",
  });

  const [image, setImage] = useState(null);
  const [confirm, setConfirm] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AuthReducer.loading);
  const error = useSelector((state) => state.AuthReducer.error);
  const imgRef = useRef();
  const [message, setMessage] = useState("");
  const [top, setTop] = useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage(img);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function validateForm(e) {
    let name = e.target.name;
    let value = e.target.value;
    let loginTop = "";
    let signupTop = "";

    switch (name) {
      case "username":
        if (value.length < 6) {
          setMessage("يجب أن يكون الاسم 7 حروف أو أكثر");
          setTop("9.5rem");
        } else {
          setMessage("");
        }
        break;
      case "email":
        loginTop = "9.2rem";
        signupTop = "14rem";
        if (!value.includes("@")) {
          setMessage("البريد الألكتروني غير صحيح");
          signedUp ? setTop(signupTop) : setTop(loginTop);
        } else {
          setMessage("");
        }
        break;
      case "password":
        loginTop = "13.5rem";
        signupTop = "18rem";
        if (value.length < 6) {
          setMessage("يجب أن تكون كلمة المرور تتكون من 6 حروف أو أكثر");
          signedUp ? setTop(signupTop) : setTop(loginTop);
        } else {
          setMessage("");
        }
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (signedUp) {
      if (data.password === data.confirmpassword) {
        if (image) {
          const formData = new FormData();
          const fileName = Date.now() + image.name;
          formData.append("name", fileName);
          formData.append("file", image);
          data.document = fileName;
          try {
            dispatch(uploadImage(formData));
          } catch (err) {
            console.log(err);
          }
        }

        dispatch(signUp(data));
      } else {
        setConfirm(false);
      }
    } else {
      dispatch(logIn(data));
    }
  }

  const resetForm = () => {
    setConfirm(true);
    setImage(null);
    setMessage("");
    setData({
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  return (
    <div className="auth">
      {/* Left Side */}
      <div className="logo">
        <h1> E NEWS </h1>
        <h6>هنا حيث الخبر اليقين</h6>
      </div>

      {/* Right Side */}
      <div className="form-side">
        <span className="logoo">
          <h1>ENEWS</h1>
        </span>
        {message && (
          <div className="error" style={{ top: top, zIndex: 10 }}>
            <MdErrorOutline style={{ fontSize: "25px", marginTop: "-5px" }} />
            {message}
          </div>
        )}
        <h3>{signedUp ? "تسجيل حساب" : "تسجيل الدخول"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="name-container">
            {signedUp && (
              <input
                type="text"
                name="username"
                placeholder="اسم المستخدم"
                onChange={handleChange}
                value={data.username}
                onBlur={validateForm}
                style={{ gap: ".5rem" }}
              />
            )}
            <input
              type="text"
              name="email"
              placeholder="البريد الإلكتروني"
              onChange={handleChange}
              value={data.email}
              onBlur={validateForm}
            />
          </div>
          <div className="pass-contianer">
            <input
              type="password"
              name="password"
              placeholder=" كلمة المرور"
              onChange={handleChange}
              value={data.password}
              onBlur={validateForm}
            />
            {signedUp && (
              <input
                type="password"
                name="confirmpassword"
                placeholder=" تأكيد كلمة المرور"
                onChange={handleChange}
                value={data.confirmpassword}
              />
            )}
          </div>
          {signedUp && (
            <div className="check">
              <div
                className="author"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                <input
                  style={{
                    cursor: "pointer",
                    accentColor: "var(--main)",
                  }}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked((pre) => !pre)}
                />
                <div>حساب ناشر</div>
              </div>

              {isChecked && (
                <div>
                  <UilScenery
                    style={{
                      marginLeft: "5px",
                      color: "var(--icon)",
                      cursor: "pointer",
                    }}
                    onClick={() => imgRef.current.click()}
                  />
                  {image && image.name.substring(0, 10)}
                </div>
              )}
              {isShown && (
                <p className="message">
                  تحديد هذا الخيار يتطلب إرفاق وثيقة رسمية من المؤسسة التي تسجل
                  هذا الحساب باسمها
                </p>
              )}
            </div>
          )}
          <span
            className="confirm"
            style={{ display: confirm ? "none" : "block" }}
          >
            *كلمات المرور غير متطابقة
          </span>

          <div className="button-container">
            <button
              className="button sign-btn"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading
                ? "...جاري التحميل"
                : signedUp
                ? "تسجيل حساب"
                : "تسجيل الدخول"}
            </button>
            {!signedUp && error && (
              <span style={{ fontSize: "13px", color: "red" }}>
                بيانات تسجيل الدخول خاطئة
              </span>
            )}
            <span
              style={{ fontSize: "14px", cursor: "pointer " }}
              onClick={() => {
                setsignedUp((prev) => !prev);
                resetForm();
              }}
            >
              {signedUp
                ? "لديك حساب بالفعل؟ تسجيل الدخول!"
                : "ليس لديك حساب؟ تسجيل!"}
            </span>
          </div>
        </form>
        <input
          style={{ display: "none" }}
          type="file"
          name="document"
          ref={imgRef}
          onChange={onImageChange}
        />
      </div>
    </div>
  );
}

export default Auth;
