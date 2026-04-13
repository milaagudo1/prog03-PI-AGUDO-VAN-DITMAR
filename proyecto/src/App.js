import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/Header";
import React from "react";
import Footer from "./components/Footer";

function App() {
  return (
    <React.Fragment>

      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/movies" exact={true} component={Home} /> 
        <Route path="/series" exact={true} component={Home} />
        <Route path="/favorites" exact={true} component={Home} />
        <Route path="/register" exact={true} component={Home} />
        <Route path="/login" exact={true} component={Home} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;

// cambiar componentes lineas 14 a 18