import { useCallback, useEffect, useState } from 'react';
import { EntryData } from '../types';
import { ItemClient, MoveClient, PokemonClient } from 'pokenode-ts';

const useDex = (
	dex: PokemonClient | ItemClient | MoveClient,
	func: keyof PokemonClient | keyof ItemClient | keyof MoveClient,
	defaultId: string = '1'
) => {
	const [data, setData] = useState<EntryData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | string | null>(null);

	const fetchData = useCallback(
		async (id: string) => {
			setLoading(true);
			setError(null);
			let data = null;
			try {
				data = await (dex as any)[func](id);
				setData(data);
			} catch (err) {
				console.error(err);
				if (err instanceof Error) {
					setError(err.toString());
				}
			}
			setLoading(false);
			return data;
		},
		[dex, func]
	);

	useEffect(() => {
		fetchData(defaultId);
	}, [defaultId, fetchData]);

	return { data, loading, error, fetchData };
};

export default useDex;
