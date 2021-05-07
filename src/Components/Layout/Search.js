import { useContext, useEffect } from "react";
import { DispatchContext } from "../../store/context";
import * as actionTypes from "./../../store/action-types";
import { useImmer } from "use-immer";
import axios from "axios";
import Post from "../Shared/Post";

const Search = (props) => {
  const [state, setState] = useImmer({
    searchQuery: "",
    results: [],
    requestCount: 0,
    show: "neither",
  });

  const dispatch = useContext(DispatchContext);
  const handleCloseSearch = () => {
    dispatch({ type: actionTypes.CLOSE_SEARCH });
  };
  const escapeHandler = (e) => {
    if (e.keyCode === 27) {
      dispatch({ type: actionTypes.CLOSE_SEARCH });
    }
  };
  const changeHandler = (e) => {
    setState((draft) => {
      draft.searchQuery = e.target.value;
    });
  };
  useEffect(() => {
    document.addEventListener("keyup", escapeHandler);
    return () => {
      document.removeEventListener("keyup", escapeHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setState((draft) => {
      draft.show = "loading";
    });
    if (state.searchQuery.trim()) {
      const delay = setTimeout(() => {
        setState((draft) => {
          draft.requestCount++;
        });
      }, 3000);
      return () => {
        clearTimeout(delay);
      };
    } else {
      setState((draft) => {
        draft.show = "neither";
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchQuery]);
  useEffect(() => {
    if (state.requestCount) {
      const request = axios.CancelToken.source();
      async function search() {
        try {
          const res = await axios.post(
            "/search",
            { searchTerm: state.searchQuery },
            { cancelToken: request.token }
          );
          setState((draft) => {
            draft.results = res.data;
            draft.show = "results";
          });
        } catch (ex) {
          console.log(ex);
        }
      }
      search();
      return () => {
        request.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.requestCount]);
  return (
    
    <div className="search-overlay" >
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input
            autoFocus
            onChange={changeHandler}
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
          <div
            className={
              "circle-loader " +
              (state.show === "loading" ? " circle-loader--visible " : "")
            }
          ></div>
          <div
            className={
              "live-search-results " +
              (state.show === "results" ? " live-search-results--visible " : "")
            }
          >
            {Boolean(state.results.length) ? (
              <div className="list-group shadow-sm">
                <div className="list-group-item active">
                  <strong>Search Results</strong> ({state.results.length}{" "}
                  {state.results.length === 1 ? "item" : "items"} found)
                </div>
                {state.results.map((post) => (
                  <Post
                    post={post}
                    key={post._id}
                    onClick={() => dispatch({ type: actionTypes.CLOSE_SEARCH })}
                  />
                ))}
              </div>
            ) : (
              <p className="alert alert-danger text-center shadow-sm">
                sorry ! we couldn't find results with that search.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
