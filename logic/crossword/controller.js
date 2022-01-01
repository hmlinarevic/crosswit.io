import * as model from './model';
import * as finder from './finder';

import { configureCrossword } from './config';

export const setCurrentCrossword = (puzzleString) => {
	const { size, columns, navigation } = configureCrossword(puzzleString);

	model.setCrossword({ string: puzzleString, size, columns, navigation });

	return model.state.crossword;
};

export const findWord = (word) => {
	const startLetter = word[0];
	const string = model.crossword.string;

	for (let i = 0; i < string.length; i++) {
		if (startLetter === string[i]) {
			model.setStartLetterIndex(i);
			finder.getPossibleLocations();
		}
	}
};
