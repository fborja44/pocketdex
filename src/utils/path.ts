export const getBaseRoute = (path: string) => {
	// Split the path by '/' and filter out empty strings
	const pathSegments = path.split('/').filter((segment) => segment !== '');

	// Reconstruct the base route
	if (pathSegments.length > 0) {
		return `/${pathSegments[0]}`;
	}

	return '/';
};

export const getIdFromRoute = (path: string) => {
	// Split the path by '/' and filter out empty strings
	const pathSegments = path.split('/').filter((segment) => segment !== '');

	// Get the id from the end of the path
	if (pathSegments.length > 0) {
		const last = pathSegments.pop();
		if (last) {
			return parseInt(last);
		}
	}

	return undefined;
};
