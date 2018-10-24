import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import NavBar from "./NavBar";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import { Provider } from "react-redux";
import store from "./store";

interface State {
  location: string;
  animal: string;
  breed: string;
  breeds: string[];
  handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnimalChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBreedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  getBreeds: () => void;
}

class App extends React.Component<{}, State> {
  public render() {
    return (
      <div>
        <NavBar />
        <Provider store={store}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
