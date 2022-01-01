import { getColumns } from './columns';
import { getNavigation } from './navigation';

export const configureCrossword = (puzzleString) => {
  const size = Math.sqrt(puzzleString.length);
  const columns = getColumns(size);
  const navigation = getNavigation(size);

  return {
    size,
    columns,
    navigation,
  };
};
