import React from "react";
import { ANIMALS } from "petfinder-client";
import { connect } from "react-redux";
import getBreeds from "./actionCreators/getBreeds";
import changeLocation from "./actionCreators/changeLocation";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";

interface Props {
  search: () => void;
}

class SearchBox extends React.Component<Props> {
  public handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };

  public render() {
    return (
      <div className="search-params">
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="location">
            Location
            <input
              onChange={this.props.handleLocationChange}
              id="location"
              value={this.props.location}
              placeholder="Location"
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              onChange={this.props.handleAnimalChange}
              onBlur={this.props.handleAnimalChange}
              id="animal"
              value={this.props.animal}
            >
              <option />
              {ANIMALS.map(animal => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              onChange={this.props.handleBreedChange}
              onBlur={this.props.handleBreedChange}
              id="breed"
              value={this.props.breed}
              disabled={!this.props.breeds.length}
            >
              <option />
              {this.props.breeds.map(breed => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <button>Search</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ location, animal, breed, breeds }) => ({
  location,
  animal,
  breed,
  breeds
});

const mapDispatchToProps = dispatch => ({
  handleLocationChange(event) {
    dispatch(changeLocation(event.target.value));
  },
  handleAnimalChange(event) {
    dispatch(changeAnimal(event.target.value));
    dispatch(getBreeds());
  },
  handleBreedChange(event) {
    dispatch(changeBreed(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
