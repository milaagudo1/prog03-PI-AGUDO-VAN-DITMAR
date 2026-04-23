import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Header from "./components/Header/Header";
import React from "react";
import Footer from "./components/Footer/Footer";
import Register from "./screens/Register/Register";
import Login from "./screens/Login/Login";
import Movies from "./screens/Movies/Movies";
import Series from "./screens/Series/Series";
import Detail from "./screens/Detail/Detail"
import Favorites from "./screens/Favorites/Favorites"
import Notfound from "./screens/NotFound/NotFound";
import Search from "./screens/Results/Results";
import "./App.css";

function App() {
  return (
    <React.Fragment>

      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/search" exact={true} component={Search} />
        <Route path="/movies" exact={true} component={Movies} /> 
        <Route path="/series" exact={true} component={Series} />
        <Route path="/favorites" exact={true} component={Favorites} />
        <Route path="/register" exact={true} component={Register} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/detail/:tipo/:id" exact={true} component={Detail} />
        <Route path=" " component={Notfound} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;

