import { PokemonClient, Pokemon } from 'pokenode-ts';
import { useEffect, useState } from 'react';

const dex = new PokemonClient({ logs: true });

const usePokemon = (defaultId: string = '1') => {
	const [data, setData] = useState<Pokemon | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | string | null>(null);

	const fetchPokemon = async (id: string) => {
		setLoading(true);
		setError(null);
		let data = null;
		try {
			data = await dex.getPokemonByName(id);
			setData(data);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.toString());
			}
		}
		setLoading(false);
		return data;
	};

	useEffect(() => {
		fetchPokemon(defaultId);
	}, [defaultId]);

	return { data, loading, error, fetchPokemon };
};

export default usePokemon;