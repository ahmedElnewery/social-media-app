import { Link } from "react-router-dom";
import Login from "../Auth/Login";
import HeaderLogin from "./HeaderLogin";

const Header = (props) => {
  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            ComplexApp
          </Link>
        </h4>
        {props.isLogin ? (
          <HeaderLogin  setIsLogin={props.setIsLogin} />
        ) : (
          <Login  setIsLogin={props.setIsLogin} />
        )}
      </div>
    </header>
  );
};

export default Header;
