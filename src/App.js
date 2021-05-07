import { useEffect, useReducer, useRef, lazy } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { DispatchContext } from "./store/context";
import { StateContext } from "./store/context";
import { rootReducer, initialState } from "./store/reducer";
import { CSSTransition } from "react-transition-group";
import { Suspense } from "react";
//components
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import About from "./Pages/About";
import Home from "./Pages/Home";
import HomeGuest from "./Pages/HomeGuest";
import Terms from "./Pages/Terms";
import Profile from "./Pages/Profile";
import EditPost from "./Pages/EditPost";
import NotFound from "./Pages/NotFound";
import Spinner from "./Components/UI/Spinner/Spinner";
const PostDetails = lazy(() => import("./Pages/PostDetails"));
const Search = lazy(() => import("./Components/Layout/Search"));
const CreatePost = lazy(() => import("./Pages/CreatePost"));
const Chat = lazy(() => import("./Components/Layout/Chat"));

function App() {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    if (state.isLogin) {
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [state.isLogin, state.userInfo]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <ToastContainer position="top-center" autoClose={2000} />
        <Header />
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
        <CSSTransition
          in={state.isSearchOpen}
          timeout={330}
          classNames="search-overlay"
          unmountOnExit
        >
          <div className="search-overlay">
            <Suspense fallback="">
              <Search  />
            </Suspense>
          </div>
        </CSSTransition>

        {state.isLogin &&<Suspense fallback="">
          <Chat />
        </Suspense> }
        <Footer />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
