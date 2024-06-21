import { ItemClient, MoveClient, PokemonClient } from 'pokenode-ts';
import { LoaderFunction, Params } from 'react-router-dom';

const pokemonClient = new PokemonClient();
const moveClient = new MoveClient();
const itemClient = new ItemClient();

export const dexLoader = async (
	params: Params<string>,
	dex: PokemonClient | ItemClient | MoveClient,
	func: keyof PokemonClient | keyof ItemClient | keyof MoveClient
) => {
	const id = params.id;
	if (!id) throw new Error('Missing Id');
	return await (dex as any)[func](id);
};

export const pokemonLoader: LoaderFunction<any> = async ({ params }) => {
	return dexLoader(params, pokemonClient, 'getPokemonByName');
};

export const abilityLoader: LoaderFunction<any> = async ({ params }) => {
	return dexLoader(params, pokemonClient, 'getAbilityByName');
};

export const moveLoader: LoaderFunction<any> = async ({ params }) => {
	return dexLoader(params, moveClient, 'getMoveByName');
};

export const itemLoader: LoaderFunction<any> = async ({ params }) => {
	return dexLoader(params, itemClient, 'getItemByName');
};
