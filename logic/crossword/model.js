export const puzzleString =
	'FHKEFFHDFEOGIOPVFLDKOIAQFLWIHQRMUOTOXNRIAAESRUOFCUHHELTUFJJSNJDO';

export const state = {
	crossword: null,

	finder: {
		startLetterIndex: null,
		possibleLocations: null,
	},
};

export const setCrossword = (crossword) => {
	Object.defineProperty(state, 'crossword', {
		value: { ...crossword },
		writable: false,
	});
};

export const setStartLetterIndex = (index) => {
	Object.defineProperty(state, 'startLetterIndex', {
		value: index,
		writable: false,
	});
};

export const setPossibleLocations = (locations) => {
	Object.defineProperty(state, 'possibleLocations', {
		value: locations,
		writable: false,
	});
};
