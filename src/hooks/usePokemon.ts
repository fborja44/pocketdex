import { PokemonClient, Pokemon } from 'pokenode-ts';
import { useEffect, useState } from 'react';

const dex = new PokemonClient({ logs: true });

const usePokemon = (defaultId: string = '1') => {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | string | null>(null);

	const fetchPokemon = async (id: string) => {
		setLoading(true);
		setError(null);
		let data = null;
		try {
			data = await dex.getPokemonByName(id);
			setPokemon(data);
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

	return { pokemon, loading, error, fetchPokemon };
};

export default usePokemon;
