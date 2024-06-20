import { Ability, PokemonClient } from 'pokenode-ts';
import useDex from './useDex';

const dex = new PokemonClient({ logs: true });

const useAbility = (defaultId: string = '1') => {
	const { data, loading, error, fetchData } = useDex(
		dex,
		'getAbilityByName',
		defaultId
	);

	return {
		ability: data as Ability,
		loading,
		error,
		fetchAbility: fetchData as (id: string) => Promise<Ability>,
	};
};

export default useAbility;
