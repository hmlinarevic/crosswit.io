import { DIRECTIONS } from './directions';

export const getNavigation = (puzzleSize) => {
  const navigation = {};

  DIRECTIONS.forEach((dir) => {
    switch (dir) {
      case 'top':
        navigation[dir] = -puzzleSize;
        break;
      case 'bottom':
        navigation[dir] = +puzzleSize;
        break;
      case 'left':
        navigation[dir] = -1;
        break;
      case 'right':
        navigation[dir] = +1;
        break;
      case 'top-left':
        navigation[dir] = -(puzzleSize + 1);
        break;
      case 'top-right':
        navigation[dir] = -(puzzleSize - 1);
        break;
      case 'bottom-left':
        navigation[dir] = +(puzzleSize - 1);
        break;
      case 'bottom-right':
        navigation[dir] = +(puzzleSize + 1);
        break;
      default:
        throw new Error("Can't create navigation");
    }
  });

  return navigation;
};
