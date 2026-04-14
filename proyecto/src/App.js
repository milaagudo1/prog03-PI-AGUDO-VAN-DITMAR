import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/Header";
import React from "react";
import Footer from "./components/Footer";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Movies from "./screens/Movies";
import Series from "./screens/Series";

function App() {
  return (
    <React.Fragment>

      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/movies" exact={true} component={Movies} /> 
        <Route path="/series" exact={true} component={Series} />
        <Route path="/favorites" exact={true} component={Home} />
        <Route path="/register" exact={true} component={Register} />
        <Route path="/login" exact={true} component={Login} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;

// cambiar componentes lineas 14 a 18