import { Move, MoveClient } from 'pokenode-ts';
import useDex from './useDex';

const dex = new MoveClient({ logs: true });

const useMove = (defaultId: string = '1') => {
	const { data, loading, error, fetchData } = useDex(
		dex,
		'getMoveByName',
		defaultId
	);

	return {
		move: data as Move,
		loading,
		error,
		fetchMove: fetchData as (id: string) => Promise<Move>,
	};
};

export default useMove;
