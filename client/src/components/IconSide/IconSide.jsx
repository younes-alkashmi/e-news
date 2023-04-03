/* eslint-disable */
import NavIcons from "../NavIcons/NavIcons";
import "./IconSide.css";
import TrendCard from "../TrendCard/TrendCard";
import React from "react";
import { getTrends } from "../../api/PostRequest";
import { useSelector } from "react-redux";

function IconSide({ location }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [trends, setTrends] = React.useState([]);

  const removeRelativePosts = (trends) => {
    const array = [];
    for (let i = 0; i < trends.length; i++) {
      if (
        user._id !== trends[i].userId &&
        !user.following.includes(trends[i].userId)
      )
        array.push(trends[i]);
    }
    return array;
  };

  // const shuffle = (trends) => {
  //   for (let i = trends.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [trends[i], trends[j]] = [trends[j], trends[i]];
  //   }
  //   return trends;
  // };

  React.useEffect(async () => {
    let { data } = await getTrends();

    data = removeRelativePosts(data);
    // shuffle(data);

    setTrends(() => data);
  }, []);

  return (
    <div className="icon-side">
      {location ? <NavIcons location="home" /> : <NavIcons />}

      <div className="trend-card">
        <h3 style={{ textAlign: "center" }}>أخبار شائعة</h3>
        {trends.length > 0 ? (
          trends.map((trend) => {
            return <TrendCard trend={trend} key={trend._id} />;
          })
        ) : (
          <div
            style={{
              direction: "rtl",
              textAlign: "center",
              paddingBottom: 1 + "rem",
              paddingTop: 1 + "rem",
            }}
          >
            {" "}
            لا توجد أخبار في الوقت الحالي...
          </div>
        )}
      </div>

      {/*

     <span className="button view-button">عرض</span>
*/}
    </div>
  );
}

export default IconSide;
