export const getColumns = (puzzleSize) => {
  const ASCII = {
    A: 65,
  };
  const columns = [];
  let char;

  for (let i = 0; i < puzzleSize; i++) {
    char = String.fromCharCode(ASCII.A + i);
    columns.push(char);
  }
  return columns;
};
