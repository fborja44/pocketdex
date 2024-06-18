import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useFetch = (endpoint: string) => {
	const base = 'https://pokeapi.co/api/v2/';

	const [data, setData] = useState<any | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | string | null>(null);

	const fetchData = useCallback(
		async (query: string | number) => {
			setLoading(true);
			setError(null);
			try {
				console.log('Fetching data...');
				const response = await axios.get(`${base}/${endpoint}/${query}`);
				console.log(response.data);
				setData(response.data);
			} catch (err) {
				if (err instanceof Error) {
					setError(err);
				} else {
					setError('An error occurred while fetching data.');
				}
				console.error(err);
			}
			setLoading(false);
		},
		[endpoint]
	);

	useEffect(() => {
		fetchData(1);
	}, [fetchData]);

	return { data, loading, error, fetchData };
};

export default useFetch;
