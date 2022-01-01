export const getCoordinate = (index) => {
  const offsetIndex = index + 1;
  const size = this.size;
  const columns = this.columns;

  const row = Math.ceil(offsetIndex / size);
  const column = columns[index - (row - 1) * size - 1];
  return `${column}${row}`;
};

export const getDirectionMultiplier = (dir) => {
  return this.navigation[dir];
};

export const getLetterLocation = (letterIndex, dir) => {
  const multiplier = this.getDirectionMultiplier(dir);
  const location = letterIndex * multiplier + this.startIndex;
  return location;
};

export const getLocationsPerDirection = (dir, word) => {
  const locations = word
    .split('')
    .map((_, i) => this.getLetterLocation(i, dir));
  return locations;
};
