import LogoSearch from "../../../components/LogoSearch/LogoSearch";
import NavIcons from "../../../components/NavIcons/NavIcons";
import PostSide from "../../../components/PostSide/PostSide";
import "./MobileHome.css";

function MobileHome() {
  return (
    <div className="mobile-pov">
      <div className="nav-logo">
        <NavIcons location="home" />
        <LogoSearch />
      </div>
      <PostSide />
    </div>
  );
}

export default MobileHome;
