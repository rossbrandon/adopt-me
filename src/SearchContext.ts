/* tslink:disable no-empty */
import React from "react";

const SearchContext = React.createContext({
  location: "Seattle, WA",
  animal: "",
  breed: "",
  breeds: [] as string[],
  handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {},
  handleAnimalChange(event: React.ChangeEvent<HTMLSelectElement>) {},
  handleBreedChange(event: React.ChangeEvent<HTMLSelectElement>) {},
  getBreeds() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
