import './App.css';
import{Home,Detail,Form,Landing} from "./views"
import {Route, useLocation} from "react-router-dom"
import NavBar from './components/NavBar/NavBar';

function App() {
  const location = useLocation()
  return (
    <div className="App">
     {location.pathname !== "/" &&  <NavBar/>}
      <Route path="/home">
      <Home/>
      </Route>
      <Route path="/detail/:id">
        <Detail/>
      </Route>
      <Route exact path="/">
      <Landing/>
      </Route>
      <Route path="/create">
        <Form></Form>
      </Route>
    </div>
  );
}

export default App;
