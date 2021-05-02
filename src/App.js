import { useEffect, useReducer } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import About from "./Pages/About";
import CreatePost from "./Pages/CreatePost";
import Home from "./Pages/Home";
import HomeGuest from "./Pages/HomeGuest";
import PostDetails from "./Pages/PostDetails";
import Terms from "./Pages/Terms";
import { DispatchContext } from "./store/context";
import {StateContext} from "./store/context";
import { rootReducer, initialState } from "./store/reducer";
import Profile from "./Pages/Profile";

function App() {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    if (state.isLogin) {
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    } else {
      localStorage.removeItem("userInfo")
    }
  }, [state.isLogin,state.userInfo]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
      <ToastContainer/>
        <Header />
        <Switch>
          <Route path="/" exact>
            {state.isLogin ? <Home /> : <HomeGuest />}
          </Route>
          <Route path="/profile/:username">
            <Profile/>
          </Route>
          <Route path="/create-post">
            <CreatePost/>
          </Route>
          <Route path="/post/:id">
            <PostDetails/>
          </Route>
          <Route path="/about-us" exact>
            <About />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
        </Switch>
        <Footer />
        
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
