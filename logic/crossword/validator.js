export const checkIfLocationsAreWithinGrid = (locations) => {
  const gridEnd = 0;
  return !locations.some((loc) => loc < gridEnd);
};

export const getIdentifiers = (locations) => {
  let letter, number;
  const coordinates = locations.map((loc) => this.getCoordinate(loc));

  const identifiers = coordinates.reduce(
    (obj, coord) => {
      letter = coord[0];
      number = coord[1];
      obj.letters.push(letter);
      obj.numbers.push(number);
      return obj;
    },
    { letters: [], numbers: [] }
  );
  return identifiers;
};

export const calcConnections = (locations) => {
  let count = 0;
  let diff = 0;
  for (let i = 0; i < locations.length - 1; ++i) {
    diff = Math.abs(locations[i] - locations[i + 1]);
    count += diff;
  }
  return count;
};

export const checkIfIdentifiersAreConnected = (identifiers) => {
  let isConnected;

  const { letters, numbers } = identifiers;
  const numOfConnections = identifiers['letters' || 'numbers'].length - 1;

  const firstLetter = letters[0];
  const identicalChars = letters.every((char) => char === firstLetter);

  if (identicalChars) {
    isConnected = this.calcConnections(numbers) === numOfConnections;
  } else {
    const lettersToNumbers = letters.map((letter) => letter.charCodeAt());
    isConnected = this.calcConnections(lettersToNumbers) === numOfConnections;
  }
  return isConnected;
};

export const validate = (locations) => {
  let isVerified = false;
  let isWithinGrid;

  isWithinGrid = this.checkIfLocationsAreWithinGrid(locations);
  if (!isWithinGrid) return isVerified;

  const identifiers = this.getIdentifiers(locations);
  const areConnected = this.checkIfIdentifiersAreConnected(identifiers);

  if (areConnected) isVerified = true;
  return isVerified;
};
