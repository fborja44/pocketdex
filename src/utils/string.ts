export const formatId = (num: number): string => {
	if (typeof num !== 'number') {
		return '???';
	}

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
