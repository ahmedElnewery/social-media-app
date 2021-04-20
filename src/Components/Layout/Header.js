import { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../store/context";
import Login from "../Auth/Login";
import UserHeader from "./UserHeader";

const Header = (props) => {
  const state = useContext(StateContext)
  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            ComplexApp
          </Link>
        </h4>
        {state.isLogin ? (
          <UserHeader   />
        ) : (
          <Login  />
        )}
      </div>
    </header>
  );
};

export default Header;
