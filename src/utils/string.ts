export const formatId = (num: number): string => {
	if (typeof num !== 'number') return '???';

	// Ensure the number is at least 0 and an integer
	const integerNum = Math.max(0, Math.floor(num));

	// Convert number to string
	let numString = integerNum.toString();

	// Pad with leading zeros if necessary
	if (numString.length < 3) {
		numString = numString.padStart(3, '0');
	}

	// Format with #
	return `#${numString}`;
};

export const parseAbilityEffects = (str: string | undefined): string[] => {
	if (!str) return ['', ''];

	const keyword = 'Overworld: ';
	const index = str.indexOf(keyword);

	// If the substring 'Overworld: ' is not found, return the whole string as the first part and an empty string as the second part
	if (index === -1) return [str, ''];

	// Extract the parts before and after the keyword
	const battle = str.substring(0, index);
	const overworld = str.substring(index + keyword.length);

	return [battle, overworld];
};
