import { PokemonClient, Ability } from 'pokenode-ts';
import { useEffect, useState } from 'react';

const dex = new PokemonClient({ logs: true });

const useAbility = (defaultId: string = '1') => {
	const [ability, setAbility] = useState<Ability | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | string | null>(null);

	const fetchAbility = async (id: string) => {
		setLoading(true);
		setError(null);
		let data = null;
		try {
			data = await dex.getAbilityByName(id);
			setAbility(data);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.toString());
			}
		}
		setLoading(false);
		return data;
	};

	useEffect(() => {
		fetchAbility(defaultId);
	}, [defaultId]);

	return { ability, loading, error, fetchAbility };
};

export default useAbility;
