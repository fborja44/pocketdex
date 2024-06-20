import { Item, ItemClient } from 'pokenode-ts';
import useDex from './useDex';

const dex = new ItemClient({ logs: true });

const useItem = (defaultId: string = '1') => {
	const { data, loading, error, fetchData } = useDex(
		dex,
		'getItemByName',
		defaultId
	);

	return {
		item: data as Item,
		loading,
		error,
		fetchItem: fetchData as (id: string) => Promise<Item>,
	};
};

export default useItem;
