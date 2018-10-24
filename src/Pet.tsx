import React from "react";
import { Link } from "@reach/router";
import { PetMedia, PetPhoto } from "petfinder-client";

interface Props {
  id: string;
  name: string;
  animal: string;
  breed: string;
  sex: string;
  media: PetMedia;
  location: string;
}

class Pet extends React.Component<Props> {
  public render() {
    const { id, name, animal, breed, sex, media, location } = this.props;

    let photos: PetPhoto[] = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    const hero = photos[0] ? photos[0].value : "http://placecorgi.com/300/300";

    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {sex} - {location}
          </h2>
        </div>
      </Link>
    );
  }
}

export default Pet;
