import { useEffect, useReducer, useRef } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import About from "./Pages/About";
import CreatePost from "./Pages/CreatePost";
import Home from "./Pages/Home";
import HomeGuest from "./Pages/HomeGuest";
import PostDetails from "./Pages/PostDetails";
import Terms from "./Pages/Terms";
import { DispatchContext } from "./store/context";
import { StateContext } from "./store/context";
import { rootReducer, initialState } from "./store/reducer";
import Profile from "./Pages/Profile";
import EditPost from "./Pages/EditPost";
import NotFound from "./Pages/NotFound";
import Search from "./Components/Layout/Search";
import { CSSTransition } from "react-transition-group";

function App() {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    if (state.isLogin) {
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [state.isLogin, state.userInfo]);
  const nodeRef = useRef(null)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <ToastContainer position="top-center" autoClose={2000} />
        <Header />
        <Switch>
          <Route path="/" exact>
            {state.isLogin ? <Home /> : <HomeGuest />}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/create-post">
            <CreatePost />
          </Route>
          <Route path="/post/:id" exact>
            <PostDetails />
          </Route>
          <Route path="/post/:id/edit">
            <EditPost />
          </Route>
          <Route path="/about-us" exact>
            <About />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <CSSTransition
          in={state.isSearchOpen}
          timeout={500}
          classNames="search-overlay"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <Search />
        </CSSTransition>
        <Footer />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
