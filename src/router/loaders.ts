import {
	EvolutionClient,
	ItemClient,
	MoveClient,
	PokemonClient,
	PokemonSpecies,
} from 'pokenode-ts';
import { LoaderFunction, Params } from 'react-router-dom';
import { getIdFromRoute } from '../utils/path';

const pokemonClient = new PokemonClient();
const evolutionClient = new EvolutionClient();
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
	const species = (await dexLoader(
		params,
		pokemonClient,
		'getPokemonSpeciesByName'
	)) as PokemonSpecies;

	// Get evolution data
	const evo_id = getIdFromRoute(species.evolution_chain.url);

	const evolution = evo_id
		? await evolutionClient.getEvolutionChainById(evo_id)
		: null;

	return {
		pokemon: await dexLoader(params, pokemonClient, 'getPokemonByName'),
		species: species,
		evolution: evolution,
	};
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
