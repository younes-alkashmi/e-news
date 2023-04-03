/* eslint-disable */

import { verifyUser } from "../../api/AuthRequest";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Welcome.css";

function Welcome() {
  const { confirmationCode } = useParams();
  const [msg, setMsg] = useState("الرابط المستخدم غير صالح");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (confirmationCode) {
      const tst = verifyUser(confirmationCode);
      tst.then((data) => {
        if (data.statusText === "OK") {
          setMsg("تم التحقق من بريدك الإلكتروني بنجاح");
          setVerified(() => true);
          console.log(verified);
        }
      });
    }
  }, []);

  return (
    <div style={{ fontSize: "30px", textAlign: "center", height: "99vh" }}>
      <div className="wel-container">
        <h2 style={{ color: "var(--grey)" }}>{msg}</h2>
        <p>
          <span className="icon-block">{verified ? "✔" : "✖"} </span>
        </p>{" "}
        <a href="http://localhost:3000/" className="button wel-btn">
          {verified ? "تسجيل الدخول" : "تسجيل حساب"}
        </a>
      </div>
    </div>
  );
}

export default Welcome;
