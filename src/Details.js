import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    petfinder.pet
      .get({ output: "full", id: this.props.id })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;

        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }

        this.setState({
          name: pet.name,
          animal: pet.animal,
          breed,
          sex: pet.sex,
          age: pet.age,
          size: pet.size,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          loading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const {
      name,
      animal,
      breed,
      sex,
      age,
      size,
      location,
      description,
      media
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h3>Type: {animal}</h3>
          <h3>Breed: {breed}</h3>
          <h3>Sex: {sex}</h3>
          <h3>Age: {age}</h3>
          <h3>Size: {size}</h3>
          <h3>Location: {location}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
