import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DispatchContext } from "../../store/context";
import * as actionTypes from "./../../store/action-types";

const Search = (props) => {
  const dispatch = useContext(DispatchContext);
  const handleCloseSearch = () => {
    dispatch({ type: actionTypes.CLOSE_SEARCH });
  };
  const escapeHandler = (e) => {
   if (e.keyCode === 27) {
      dispatch({ type: actionTypes.CLOSE_SEARCH });
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", escapeHandler);
    return () => {
      document.removeEventListener("keyup", escapeHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
     
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input
            autoFocus
            type="text"
            autoComplete="off"
            id="live-search-field"
            className="live-search-field"
            placeholder="What are you interested in?"
          />
          <span className="close-live-search" onClick={handleCloseSearch}>
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div className="live-search-results live-search-results--visible">
            <div className="list-group shadow-sm">
              <div className="list-group-item active">
                <strong>Search Results</strong> (3 items found)
              </div>
              <Link to="#" className="list-group-item list-group-item-action">
                <img
                  className="avatar-tiny"
                  src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
                  alt=""
                />{" "}
                <strong>Example Post #1</strong>
                <span className="text-muted small">by brad on 2/10/2020 </span>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action">
                <img
                  className="avatar-tiny"
                  src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
                  alt=""
                />{" "}
                <strong>Example Post #2</strong>
                <span className="text-muted small">
                  by barksalot on 2/10/2020{" "}
                </span>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action">
                <img
                  className="avatar-tiny"
                  src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
                  alt=""
                />{" "}
                <strong>Example Post #3</strong>
                <span className="text-muted small">by brad on 2/10/2020 </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
