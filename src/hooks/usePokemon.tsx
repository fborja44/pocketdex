import { PokemonClient, Pokemon } from 'pokenode-ts';
import { useEffect, useState } from 'react';

const dex = new PokemonClient({ logs: true });

const usePokemon = () => {
	const [data, setData] = useState<Pokemon | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | string | null>(null);

	const fetchData = async (id: string) => {
		setLoading(true);
		try {
			const res = await dex.getPokemonByName(id);
			setData(res);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.toString());
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData('1');
	}, []);

	return { data, loading, error, fetchData };
};

export default usePokemon;
