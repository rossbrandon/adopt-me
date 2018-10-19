import React from "react";
import pf from "petfinder-client";
import Loadable from "react-loadable";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const LoadableContent = Loadable({
  loader: () => import("./AdoptModalContent"),
  loading() {
    return <h1>Loading... Splitting out AdoptModalContent code...</h1>;
  }
});

class Details extends React.Component {
  state = {
    loading: true,
    showModal: false
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

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
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1 ref={el => (this.petName = el)}>{name}</h1>
          <h3>Type: {animal}</h3>
          <h3>Breed: {breed}</h3>
          <h3>Sex: {sex}</h3>
          <h3>Age: {age}</h3>
          <h3>Size: {size}</h3>
          <h3>Location: {location}</h3>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <LoadableContent toggleModal={this.toggleModal} name={name} />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
