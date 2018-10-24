import React from "react";
import pf, { PetResponse, PetMedia } from "petfinder-client";
import { navigate, RouteComponentProps } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";
import AdoptModalContent from "./AdoptModalContent";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API Keys");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  public state = {
    loading: true,
    showModal: false
  };

  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  public componentDidMount() {
    if (!this.props.id) {
      return;
    }

    petfinder.pet
      .get({ output: "full", id: this.props.id })
      .then((data: PetResponse) => {
        if (!data.petfinder.pet) {
          navigate("/");
          return;
        }
        let breed;

        if (Array.isArray(data.petfinder.pet.breeds.breed)) {
          breed = data.petfinder.pet.breeds.breed.join(", ");
        } else {
          breed = data.petfinder.pet.breeds.breed;
        }

        this.setState({
          name: data.petfinder.pet.name,
          animal: data.petfinder.pet.animal,
          breed,
          sex: data.petfinder.pet.sex,
          age: data.petfinder.pet.age,
          size: data.petfinder.pet.size,
          location: `${data.petfinder.pet.contact.city}, ${
            data.petfinder.pet.contact.state
          }`,
          description: data.petfinder.pet.description,
          media: data.petfinder.pet.media,
          loading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }

  public render() {
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
          <h1>{name}</h1>
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
              <AdoptModalContent toggleModal={this.toggleModal} name={name} />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}
export default Details;
