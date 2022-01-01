import { DIRECTIONS } from './config';

import * as navigator from './navigator';
import * as validator from './validator';

export const getPossibleLocations = () => {
  const wordToFind = this.wordToFind;
  const startLetterIndex = this.startLetterIndex;
  // const navigator = this.navigator;
  // const validator = this.validator;

  const possibleLocations = DIRECTIONS.reduce((obj, dir) => {
    let locations, isVerified;
    locations = navigator.getLocationsPerDirection(
      dir,
      wordToFind,
      startLetterIndex
    );
    console.log(locations);
    isVerified = validator.validate(locations);

    if (isVerified) obj[dir] = locations;
    return obj;
  }, {});
  return possibleLocations;
};

export const getCorrectLocations = () => {
  let correctLocations = null;
  let matches;
  const possibleDirections = Object.keys(this.possibleLocations);

  possibleDirections.forEach((direction) => {
    matches = this.possibleLocations[direction].every((location, i) => {
      return this.puzzle.string[location] === this.wordToFind[i];
    });
    if (matches) {
      correctLocations = this.possibleLocations[direction];
    }
  });
  return correctLocations;
};
