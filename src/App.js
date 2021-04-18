import { Route, Switch } from 'react-router';
import './App.css';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import About from './Pages/About';
import HomeGuest from './Pages/HomeGuest';
import Terms from './Pages/Terms';

function App() {
  return (
    <>
    <Header/>
    <Switch>
      <Route path="/" exact><HomeGuest/></Route>
      <Route path="/about-us" exact><About/></Route>
      <Route path="/terms" exact><Terms/></Route>
    </Switch>
    <Footer/>

    </>
  );
}

export default App;
