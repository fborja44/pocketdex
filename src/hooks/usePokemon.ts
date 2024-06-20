import { PokemonClient, Pokemon } from 'pokenode-ts';
import useDex from './useDex';

const dex = new PokemonClient({ logs: true });

const usePokemon = (defaultId: string = '1') => {
	const { data, loading, error, fetchData } = useDex(
		dex,
		'getPokemonByName',
		defaultId
	);

	return {
		pokemon: data as Pokemon,
		loading,
		error,
		fetchPokemon: fetchData as (id: string) => Promise<Pokemon>,
	};
};

export default usePokemon;
