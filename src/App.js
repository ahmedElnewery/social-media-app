import { useState } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import About from "./Pages/About";
import Home from "./Pages/Home";
import HomeGuest from "./Pages/HomeGuest";
import Terms from "./Pages/Terms";

function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("userInfo") ? true : false
  );
  return (
    <>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Switch>
        <Route path="/" exact>
          {isLogin ? (
            <Home />
          ) : (
            <HomeGuest isLogin={isLogin} setIsLogin={setIsLogin} />
          )}
        </Route>
        <Route path="/about-us" exact>
          <About />
        </Route>
        <Route path="/terms" exact>
          <Terms />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
