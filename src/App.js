import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Loadable from "react-loadable";
import NavBar from "./NavBar";
import { Provider } from "react-redux";
import store from "./store";

const LoadableDetails = Loadable({
  loader: () => import("./Details"),
  loading() {
    return <h1>Loading... Splitting out Details code...</h1>;
  }
});

const LoadableResults = Loadable({
  loader: () => import("./Results"),
  loading() {
    return <h1>Loading... Splitting out Results code...</h1>;
  }
});

const LoadableSearchParams = Loadable({
  loader: () => import("./SearchParams"),
  loading() {
    return <h1>Loading... Splitting out SearchParams code...</h1>;
  }
});

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Provider store={store}>
          <Router>
            <LoadableResults path="/" />
            <LoadableDetails path="/details/:id" />
            <LoadableSearchParams path="/search" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
